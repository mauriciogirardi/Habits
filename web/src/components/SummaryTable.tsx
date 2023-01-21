import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'
import { WeekDays } from './WeekDays'

const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export const SummaryTable = () => {
  return (
    <div className="w-full flex gap-6">
      <WeekDays />

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => (
          <HabitDay
            key={date.toISOString()}
            amount={3}
            completed={Math.random() * 5}
          />
        ))}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 border-2 bg-zinc-900 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  )
}
