import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Header from "../components/header"
import EntryPoint from "../screens/EntryPoint"
import Registration from "@/screens/registration"

const Stack = createNativeStackNavigator()

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ header: props => <Header {...props} /> }}>
      <Stack.Screen
        name="EntryPoint"
        component={EntryPoint}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default RootStack
