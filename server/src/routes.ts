import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'
import dayjs from 'dayjs'

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (req, res) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    })

    const { title, weekDays } = createHabitBody.parse(req.body)
    const today = dayjs().startOf('day').toDate()

    const habit = await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => ({ week_day: weekDay })),
        },
      },
    })

    return res.status(201).send(habit)
  })

  app.get('/day', async (req, res) => {
    const getDayQuery = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayQuery.parse(req.query)
    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    })

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id)

    return res.status(200).send({ possibleHabits, completedHabits })
  })

  app.patch('/habits/:id/toggle', async (req, res) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParams.parse(req.params)
    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          habit_id: id,
          day_id: day.id,
        },
      })
    }

    return res.status(201).send()
  })

  app.get('/summary', async (req, res) => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date, 
        (
          SELECT cast(count(*) as float) 
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
          ON H.id = HWD.habit_id
          WHERE HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    res.status(200).send(summary)
  })
}
