const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

export const WeekDays = () => {
  return (
    <div className="grid grid-rows-7 grid-flow-row gap-3">
      {weekDays.map((week) => (
        <div
          key={week}
          className="text-zinc-400 text-xl h-10 w-10 flex justify-center items-center font-bold"
        >
          {week}
        </div>
      ))}
    </div>
  )
}
