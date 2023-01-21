import { View, ActivityIndicator } from 'react-native'

type LoadingProps = {
  size?: 'large' | 'small'
  color?: string
}

export const Loading = ({
  size = 'large',
  color = '#7c3aed',
}: LoadingProps) => {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator color={color} size={size} />
    </View>
  )
}
