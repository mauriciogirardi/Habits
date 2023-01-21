type ProgressbarProps = {
  progress: number
}

export const Progressbar = ({ progress }: ProgressbarProps) => {
  const progressStyles = {
    width: `${progress}%`,
  }

  return (
    <div className="h-3 rounded-xl w-full mt-4 bg-zinc-700">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-violet-600"
        style={progressStyles}
      ></div>
    </div>
  )
}
