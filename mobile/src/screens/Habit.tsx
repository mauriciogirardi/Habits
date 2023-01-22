import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ScrollView, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { Progressbar } from '../components/Progressbar'

type Params = {
  date: string
}

export const Habit = () => {
  const route = useRoute()
  const { date } = route.params as Params
  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className=" text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <Progressbar progress={75} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" />
          <Checkbox title="Academia" checked />
        </View>
      </ScrollView>
    </View>
  )
}
