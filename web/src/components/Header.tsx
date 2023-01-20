import { Plus } from 'phosphor-react'
import logoImage from '../assets/logo.svg'

type HeaderProps = {}

export const Header = ({}: HeaderProps) => {
  return (
    <header className="w-full max-w-3xl mx-auto flex justify-between items-center">
      <img src={logoImage} alt="Habits" />
      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:border-violet-600"
      >
        <Plus className="border-violet-500" size={20} />
        Novo Habito
      </button>
    </header>
  )
}
