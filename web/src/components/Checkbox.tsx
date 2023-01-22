import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { Check } from 'phosphor-react'

type CheckboxProps = {
  label: string
  disableLineText?: boolean
} & CheckboxRadix.CheckboxProps

export const Checkbox = ({
  label,
  disableLineText = false,
  onCheckedChange,
  checked,
}: CheckboxProps) => {
  return (
    <CheckboxRadix.Root
      className="flex items-center gap-3 group"
      onCheckedChange={onCheckedChange}
      checked={checked}
    >
      <div className="group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-600 w-8 h-8 bg-zinc-800 border-2 border-zinc-700 rounded-lg flex items-center justify-center">
        <CheckboxRadix.Indicator>
          <Check size={20} className="text-white" />
        </CheckboxRadix.Indicator>
      </div>
      <span
        className={clsx(' text-white leading-tight', {
          'group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 font-semibold text-xl':
            !disableLineText,
        })}
      >
        {label}
      </span>
    </CheckboxRadix.Root>
  )
}
