import TextField from "@/components/text-field"
import NextBtn from "@assets/icons/arrowRightBtn.svg"
import Info from "@assets/icons/information.svg"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import FormProgress from "./components/FormProgress"

interface IProps {
    nextStep: () => void
    prevStep: () => void
}
  
const CurrentAddressForm = ({ nextStep, prevStep }: IProps) => {
  return (
    <View>
      <FormProgress 
        steps={[
          { step: 1, title: "Personal Details" },
          { step: 2, title: "Current Details" },
          { step: 3, title: "Nepal Address" },
        ]}
        currentStep={2} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" my-8">
          <View className=" flex-row items-center gap-x-2">
            <Info width={16} height={16}/>
            <Text className="text-[16px] font-semibold">Current Address</Text>
          </View>
        
          <View className="mt-5">
            <TextField labelClassName="text-gray-dark-color" name="country" value="Belgium" editable={false} placeholder="Country" />
          </View>
          <View className="mt-5">
            <TextField labelClassName="text-gray-dark-color" name="state" placeholder="Enter State/Province/Region"/>
          </View>
          <View className="mt-5">
            <TextField labelClassName="text-gray-dark-color" name="city" placeholder="Enter City"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="street" placeholder="Enter Street Address"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="postalcode" placeholder="Enter ZIP/Postal Code"/>
          </View>
        </View>
      </ScrollView> 
      <View className=" flex-row items-center justify-between">
        <TouchableOpacity className="" onPress={prevStep}>
          <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
            <Text className=" text-white text-[14px] font-semibold">Prev</Text>
            <NextBtn width={20} height={20} fill="white" /> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="" onPress={nextStep}>
          <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
            <Text className=" text-white text-[14px] font-semibold">Next</Text>
            <NextBtn width={20} height={20} fill="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CurrentAddressForm