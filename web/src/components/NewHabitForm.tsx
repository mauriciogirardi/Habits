import { Check } from 'phosphor-react'

export const NewHabitForm = () => {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        autoFocus
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />

      <label htmlFor="title" className="font-semibold leading-tight mt-6">
        Qual a recorrência?
      </label>

      <button
        type="submit"
        className="flex items-center gap-3 mt-6 rounded-lg p-4 font-semibold bg-green-600 justify-center hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
