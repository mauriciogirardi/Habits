import { HabitDay } from './HabitDay'
import { WeekDays } from './WeekDays'

export const SummaryTable = () => {
  return (
    <div className="w-full flex gap-6">
      <WeekDays />
      <HabitDay />
    </div>
  )
}
