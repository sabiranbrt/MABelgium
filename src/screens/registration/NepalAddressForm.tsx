import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import FormProgress from "./components/FormProgress"
import Info from "@assets/icons/information.svg"
import NextBtn from "@assets/icons/arrowRightBtn.svg"
import SelectOption from "@/components/select-option"
import TextField from "@/components/text-field"
import { useDistrictList, useMunicipalityList, useProvinceList } from "@/hooks"

interface IProps {
    prevStep: () => void
  }

const NepalAddressForm = ({ prevStep }: IProps) => {
  const { data: provinceList } = useProvinceList()
  const ProvienceList = provinceList?.province

  const [provinceID, setProvinceID] = useState<number | null>(null)
  const [districtID, setDistrictID] = useState<number | null>(null)

  const { data: districtList } = useDistrictList(provinceID ?? 0)
  const DistrictList = districtList?.districts

  const { data: municipalityList } = useMunicipalityList(districtID ?? 0)
  const MunicipalityList = municipalityList?.municipalities

  console.log("districtID",districtID)

  // Extract the first province ID (or set default logic)
  useEffect(() => {
    if (ProvienceList?.length > 0) {
      setProvinceID(ProvienceList[0].id) // Set first province ID by default
    }
    if (DistrictList?.length > 0) {
      setDistrictID(DistrictList[0].id) // Set first province ID by default
    }
  }, [provinceList,DistrictList])
  
  return (
    <View>
      <FormProgress 
        steps={[
          { step: 1, title: "Personal Details" },
          { step: 2, title: "Current Details" },
          { step: 3, title: "Nepal Address" },
        ]}
        currentStep={3} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" my-8">
          <View className=" flex-row items-center gap-x-2">
            <Info width={16} height={16}/>
            <Text className="text-[16px] font-semibold">Nepal Address</Text>
          </View>
          <View className="">
            <SelectOption options={ProvienceList} title="Select Province/Region" labelClassName="text-gray-dark-color" name="nepal_state" placeholder="Select Province/Region"/>
          </View>
          <View className="">
            <SelectOption options={DistrictList} title="Select District" labelClassName="text-gray-dark-color" name="district" placeholder="Select District"/>
          </View>
          <View className=" ">
            <SelectOption options={MunicipalityList} title="Select Municipality/Rural Municipality" labelClassName="text-gray-dark-color" name="municipality" placeholder="Select Municipality/Rural Municipality"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="ward" placeholder="Enter Ward Number" rules={{required:"Ward Number required"}} />
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="nep_city_address" placeholder="Enter Street/Tole Address" />
          </View>
        </View>
      </ScrollView> 
      <View className=" flex-row items-center justify-between mx-4">
        <TouchableOpacity className="" onPress={prevStep}>
          <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
            <Text className=" text-white text-[14px] font-semibold">Prev</Text>
            <NextBtn width={20} height={20} fill="white" /> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="" onPress={()=> {}}>
          <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
            <Text className=" text-white text-[14px] font-semibold">Submit Now</Text>
            <NextBtn width={20} height={20} fill="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NepalAddressForm