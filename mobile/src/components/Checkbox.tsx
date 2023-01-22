import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

type CheckboxProps = {
  title: string
  checked?: boolean
} & TouchableOpacityProps

export const Checkbox = ({
  title,
  checked = false,
  ...rest
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
          <Feather name="check" size={20} color={colors.white} />
        </View>
      ) : (
        <View className="h-8 w-8 rounded-lg  bg-zinc-800 border-2 border-zinc-700" />
      )}

      <Text className="text-white text-base ml-3">{title}</Text>
    </TouchableOpacity>
  )
}
