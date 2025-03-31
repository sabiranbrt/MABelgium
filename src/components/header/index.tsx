import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Arrow from "@assets/icons/headerArrow.svg"

// const Header = ({ navigation, options, route }: NativeStackHeaderProps) => {
const Header = ({navigation, options, route}: TODO) => {
  // const showBackButton = navigation.canGoBack()

  const HeaderRight = (props: TODO) =>
    options?.headerRight ? (
      options?.headerRight({
        ...props,
      })
    ) : (
      <></>
    )

  const HeaderLeft = (props: TODO) =>
    options?.headerLeft ? (
      options?.headerLeft({
        ...props,
      })
    ) : (
      <>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="items-center justify-center w-7 h-7 border-medium p-5 rounded-[10px] border-primary-light">
          <Arrow width={16} height={16} />
        </TouchableOpacity>
      </>
    )

  const formatHeaderText = (text: string) => {
    return text?.split?.("-").join(" ")
  }

  return (
    <View className="flex-row items-center justify-between px-3 bg-white h-14">
      <View className="flex-row flex-1 px-2 items-center">
        <HeaderLeft />
        <Text
          style={{textTransform: "capitalize"}}
          className="ml-2 text-header-lg font-fw-lg">
          {formatHeaderText(
            route.params?.id || route.params?.id === ""
              ? route.params?.id
              : route.name,
          )}
        </Text>
      </View>
      <HeaderRight />
    </View>
  )
}

export default Header
