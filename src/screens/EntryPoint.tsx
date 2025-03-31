import Logo from "@assets/images/logo.png"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import Website from "@assets/icons/website.svg"
import Mail from "@assets/icons/mail.svg"
import Arrow from "@assets/icons/arrowbtn.svg"
import BrandLogo from "@assets/images/brand-logo.png"
import { Image, Text, TouchableOpacity, View } from "react-native"

const EntryPoint = () => {
  const { navigate } = useNavigation<TODO>()
  return (
    <View className=" flex-1 px-4 bg-primary justify-between opacity-90">
      <View className=" flex-1 px-4 justify-between py-10 relative">
        <View className="">
          <Image source={Logo} className=" h-16 w-full" resizeMode="contain" />
        </View>
        <View className=" my-4 gap-y-5 items-start relative">
          <Text className=" text-white font-bold text-[26px] leading-8 tracking-widest">A common representative
            of the Magar indigenous
            people of Nepal.</Text>
          <Text className=" text-white leading-7 tracking-widest">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis molestias ipsa dolores cumque nostrum sunt hic saepe provident a, repellat amet dolorem facilis earum nihil dignissimos perspiciatis vel quas?</Text>
          <View className=" items-center mt-12">
            <TouchableOpacity className=" bg-white flex-row gap-x-2 px-5 py-2 rounded-[39px]" onPress={() => navigate("Registration", { id: "" })}>
              <Text className=" text-primary items-center font-semibold">Register Now</Text>
              <Arrow width={16} height={16}/>
            </TouchableOpacity>
          </View>
          <View className=" absolute top-[-80] opacity-10">
            <Image source={BrandLogo} className=" h-96" resizeMode="contain" />
          </View>
        </View>
        <View className=" items-center gap-y-1">
          <View className=" flex-row items-center gap-x-1">
            <Website width={13} height={13} />
            <Text className=" text-white">www.magarsanghbelgium.com</Text>
          </View>
          <View className=" flex-row items-center gap-x-1">
            <Mail width={13} height={13} />
            <Text className=" text-white">info@gmail.com.np</Text>
          </View>
        </View>
        <View className=" absolute bottom-[80] left-[-120px] opacity-15">
          <Image source={BrandLogo} className=" h-28" resizeMode="contain" />
        </View> 
        <View className=" absolute bottom-[20] right-[-100px] opacity-15">
          <Image source={BrandLogo} className=" h-28" resizeMode="contain" />
        </View>
      </View>
    </View>
  )
}

export default EntryPoint
