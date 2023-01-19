import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './lib/prisma'

const app = Fastify()
app.register(cors)

app.get('/habits', async (req, res) => {
  const habits = await prisma.habit.findMany()

  return res.status(200).send(habits)
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server is running at port 3333'))
  .catch((err) => console.error(err))
