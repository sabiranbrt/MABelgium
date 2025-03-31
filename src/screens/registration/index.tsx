import React, { useState } from "react"
import { Image, View } from "react-native"
import CurrentAddressForm from "./CurrentAddressForm"
import NepalAddressForm from "./NepalAddressForm"
import PersonalDetailForm from "./PersonalDetailForm"
import Logo from "@assets/images/logo.png"
import { FormProvider, useForm } from "react-hook-form"

const Registration = () => {
  const methods = useForm<TODO>()

  const [step, setStep] = useState<number>(1)
  
  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
    case 1:
      return <PersonalDetailForm nextStep={nextStep}   />
    case 2:
      return <CurrentAddressForm nextStep={nextStep} prevStep={prevStep}   />
    case 3:
      return <NepalAddressForm prevStep={prevStep} />
    default:
      return <PersonalDetailForm nextStep={nextStep} />
    }
  }
  return (
    <View className=" flex-1 bg-white">
      <View className=" bg-primary items-center py-4">
        <Image source={Logo} className=" h-12" resizeMode="contain"  />
      </View>
      <View className=" px-4 flex-1 py-8">
        <FormProvider {...methods}>
          {renderStep()}
        </FormProvider>
      </View>
    </View>
  )
}

export default Registration