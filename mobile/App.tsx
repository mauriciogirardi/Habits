import { Text, View, StatusBar } from 'react-native'
import {
  useFonts,
  Inter_700Bold,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_800ExtraBold,
  })

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      {!fontsLoaded ? (
        <Loading />
      ) : (
        <Text>Open up App.tsx to start working on your app!</Text>
      )}
    </View>
  )
}
