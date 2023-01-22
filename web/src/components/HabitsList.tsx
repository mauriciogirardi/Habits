import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../lib/axios'
import { Checkbox } from './Checkbox'

type HabitsListProps = {
  date: Date
  onCompletedChange: (completed: number) => void
}

type DayData = {
  completedHabits: string[]
  possibleHabits: {
    created_at: string
    id: string
    title: string
  }[]
}

export const HabitsList = ({ date, onCompletedChange }: HabitsListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<DayData>()
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  const fetchHabitsInfo = async () => {
    try {
      const { data } = await api.get('day', {
        params: {
          date: date.toISOString(),
        },
      })

      setHabitsInfo(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFetchingToggle = async (habitId: string) => {
    try {
      if (!isDateInPast) {
        await api.patch(`habits/${habitId}/toggle`)

        let completedHabits: string[] = []
        const isHabitAlreadyCompleted =
          habitsInfo!.completedHabits.includes(habitId)
        if (isHabitAlreadyCompleted) {
          completedHabits = habitsInfo!.completedHabits.filter(
            (id) => id !== habitId
          )
          setHabitsInfo({
            completedHabits,
            possibleHabits: habitsInfo!.possibleHabits,
          })
        } else {
          completedHabits = [...habitsInfo!.completedHabits, habitId]
          setHabitsInfo({
            completedHabits,
            possibleHabits: habitsInfo!.possibleHabits,
          })
        }

        onCompletedChange(completedHabits.length)
      } else {
        toast.warning('Você não poder alterar um hábito no passado!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          theme: 'dark',
        })
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao clicar no toggle, tente novamente!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        theme: 'dark',
      })
    }
  }

  useEffect(() => {
    fetchHabitsInfo()
  }, [])

  return (
    <div className="mt-6 flex flex-col gap-2">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox
          key={habit.id}
          label={habit.title}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          onCheckedChange={() => handleFetchingToggle(habit.id)}
        />
      ))}
    </div>
  )
}
