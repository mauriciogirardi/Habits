import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'
import { WeekDays } from './WeekDays'

type SummaryData = {
  amount: number
  completed: number
  date: string
  id: string
}[]

const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export const SummaryTable = () => {
  const [summary, setSummary] = useState<SummaryData>([])

  const fetchSummary = async () => {
    try {
      const { data } = await api.get<SummaryData>('/summary')
      setSummary(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <div className="w-full flex gap-6">
      <WeekDays />

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) =>
              dayjs(date).isSame(day.date, 'day')
            )

            return (
              <HabitDay
                key={date.toISOString()}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                date={date}
              />
            )
          })}

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
