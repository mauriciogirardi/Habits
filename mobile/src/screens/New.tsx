import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import colors from 'tailwindcss/colors'
import { useState } from 'react'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export const New = () => {
  const [weekDays, setWeekDays] = useState<number[]>([])

  const handleToggleWeekDay = (weekDayIndex: number) => {
    weekDays.includes(weekDayIndex)
      ? setWeekDays((prevState) =>
          prevState.filter((weekDay) => weekDay !== weekDayIndex)
        )
      : setWeekDays((prevState) => [...prevState, weekDayIndex])
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        <TextInput
          placeholderTextColor={colors.zinc[400]}
          placeholder="Exercícios, dormir bem, etc..."
          className="h-12 pl-4 rounded-xl mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600 "
        />

        <Text className="mt-6 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>
        <View className="mt-6">
          {availableWeekDays.map((weekDay, index) => (
            <Checkbox
              key={weekDay}
              title={weekDay}
              onPress={() => handleToggleWeekDay(index)}
              checked={weekDays.includes(index)}
            />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6 bg-green-600 rounded-md flex-row items-center h-14 justify-center w-full"
        >
          <Feather size={20} name="check" color={colors.white} />
          <Text className="text-white font-semibold ml-2 text-base">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
