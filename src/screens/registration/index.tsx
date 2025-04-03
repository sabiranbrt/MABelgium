import React, { useState } from "react"
import { Image, View } from "react-native"
import CurrentAddressForm from "./CurrentAddressForm"
import NepalAddressForm from "./NepalAddressForm"
import PersonalDetailForm from "./PersonalDetailForm"
import Logo from "@assets/images/logo.png"
import { FormProvider, useForm } from "react-hook-form"
import { IProps } from "@/types"
import { useSaveData } from "@/hooks"
import ActionModal from "@/components/modal"
import LoadingMessage from "@/components/modal/loadingMessage"

const Registration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setisLoading] = useState(false)

  const methods = useForm<IProps>() // Use your form interface
  const { handleSubmit,reset } = methods // Get handleSubmit from methods
  const { saveData,isSuccess } = useSaveData()
  
  const onSubmit = async(data: IProps) => {
    const form = new FormData()
    form.append("fullname", String(data.fullname ?? ""))
    form.append("father_name", String(data.father_name ?? ""))
    form.append("mother_name", String(data.mother_name ?? ""))
    form.append("email", String(data.email ?? ""))
    form.append("dob", String(data.dob ?? ""))
    form.append("citizentype", String(data.citizentype ?? ""))
    form.append("id_card_front", String(data.id_card_front ?? ""))
    form.append("id_card_back", String(data.id_card_back ?? ""))
    form.append("citizentype", String(data.citizentype ?? ""))
    form.append("profession", String(data.profession ?? ""))
    form.append("contact", String(data.contact ?? ""))
    form.append("state", String(data.state ?? ""))
    form.append("city", String(data.city ?? ""))
    form.append("address", String(data.address ?? ""))
    form.append("postalcode", String(data.postalcode ?? ""))
    form.append("nepal_state", String(data.nepal_state ?? ""))
    form.append("district", String(data.district ?? ""))
    form.append("municipality", String(data.municipality ?? ""))
    form.append("nep_zip_code", String(data.nep_zip_code ?? ""))
    form.append("nep_city_address", String(data.nep_city_address ?? ""))
    form.append("photo", String(data.photo ?? ""))

    console.log("form-->", form)
    try {
      setisLoading(true)
      const response = await saveData(form)
      if (isSuccess) {
        reset()
      }
      console.log("response",response)
    }
    catch (error) {
      console.log("Error Saving", error)
    }
    finally {
      setisLoading(false)
      setIsModalOpen(false)
    }
  }
  const [step, setStep] = useState<number>(1)
  
  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
    case 1:
      return <PersonalDetailForm nextStep={nextStep}   />
    case 2:
      return <CurrentAddressForm nextStep={nextStep} prevStep={prevStep}  />
    case 3:
      return <NepalAddressForm prevStep={prevStep} onSubmit={()=> setIsModalOpen(true)} />
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
      <ActionModal headTitle="Save Registration" title="do you want to register ?" title_odd="No" title_even="Yes" isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} handleConfirm={() => handleSubmit(onSubmit)()} />
      <LoadingMessage isModalOpen={isLoading} title="Please wait" subTitle="Submitting Registration" />
    </View>
  )
}

export default Registration