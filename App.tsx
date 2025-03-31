import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import {
  SafeAreaView,
} from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import "./global.css"
import RootStack from "./src/navigation/RootStack"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <SafeAreaView className="flex-1">
            <RootStack />
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

export default App
