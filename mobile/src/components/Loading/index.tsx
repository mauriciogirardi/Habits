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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#09090a',
      }}
    >
      <ActivityIndicator color={color} size={size} />
    </View>
  )
}
