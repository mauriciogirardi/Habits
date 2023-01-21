import dayjs from 'dayjs'

export const generateRangeDatesFromYearStart = () => {
  const startDate = dayjs().startOf('year')
  const endDate = new Date()

  let dateRange = []
  let compareDate = startDate

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dateRange
}
