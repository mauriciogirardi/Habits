import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../lib/axios'
import { Checkbox } from './Checkbox'

const availableWeekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export const NewHabitForm = () => {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const clearFields = () => {
    setTitle('')
    setWeekDays([])
  }

  const handleCreateNewHabit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (!title || weekDays.length === 0) {
        return toast.error(
          'O campo comprometimento e recorrência são obrigatórios!',
          {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            theme: 'dark',
          }
        )
      }

      setIsFetching(true)

      await api.post('/habits', {
        title,
        weekDays,
      })

      toast.success('Novo hábito criado com sucesso!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        theme: 'dark',
      })

      clearFields()
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetching(false)
    }
  }

  const handleToggleWeekDay = (weekDay: number) => {
    weekDays.includes(weekDay)
      ? setWeekDays((prevState) => prevState.filter((day) => day !== weekDay))
      : setWeekDays((prevState) => [...prevState, weekDay])
  }

  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        autoFocus
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="title" className="font-semibold leading-tight mt-6">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekdays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            label={weekDay}
            disableLineText
            onCheckedChange={() => handleToggleWeekDay(index)}
            checked={weekDays.includes(index)}
          />
        ))}
      </div>

      <button
        disabled={isFetching}
        type="submit"
        className="flex items-center gap-3 mt-6 rounded-lg p-4 font-semibold bg-green-600 justify-center hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-zinc-500"
      >
        {!isFetching && <Check size={20} weight="bold" />}
        {isFetching ? 'Registrando...' : 'Confirmar'}
      </button>
    </form>
  )
}
