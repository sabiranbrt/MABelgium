import SelectOption from "@/components/select-option"
import TextField from "@/components/text-field"
import { useDistrictList, useMunicipalityList, useProvinceList } from "@/hooks"
import PrevBtn from "@assets/icons/arrowLeftBtn.svg"
import Info from "@assets/icons/information.svg"
import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import FormProgress from "./components/FormProgress"

interface IProp {
  prevStep: () => void
  }

const NepalAddressForm = ({ prevStep }: IProp) => {


  const { data: provinceList } = useProvinceList()
  const ProvienceList = provinceList?.province

  const [provinceID, setProvinceID] = useState<number | null>(null)
  const [districtID, setDistrictID] = useState<number | null>(null)

  const { data: districtList } = useDistrictList(provinceID ?? 0)
  const DistrictList = districtList?.districts

  const { data: municipalityList } = useMunicipalityList(districtID ?? 0)
  const MunicipalityList = municipalityList?.municipalities

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
          <View className="mt-5">
            <SelectOption options={ProvienceList} title="Select Province/Region" labelClassName="text-gray-dark-color" name="nepal_state" placeholder="Select Province/Region" onClick={(selectedItem) => setProvinceID(selectedItem)} rules={{required:"propostalcodevince is required*"}}  />
          </View>
          <View className=" mt-5">
            <SelectOption options={DistrictList} title="Select District" labelClassName="text-gray-dark-color" name="district" placeholder="Select District"
              onClick={(selectedItem)=>setDistrictID(selectedItem)} rules={{required:"propostalcodevince is required*"}}/>
          </View>
          <View className="mt-5">
            <SelectOption options={MunicipalityList} title="Select Municipality/Rural Municipality" labelClassName="text-gray-dark-color" name="municipality" placeholder="Select Municipality/Rural Municipality" rules={{required:"propostalcodevince is required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="nep_zip_code" placeholder="Enter Ward Number" rules={{required:"Ward Number required*"}} />
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="nep_city_address" placeholder="Enter Street/Tole Address" rules={{required:"propostalcodevince is required*"}} />
          </View>
        </View>
      </ScrollView> 
      <View className=" flex-row items-center justify-between mx-4">
        <TouchableOpacity className="" onPress={prevStep}>
          <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
            <PrevBtn width={20} height={20} fill="white" /> 
            <Text className=" text-white text-[14px] font-semibold">Prev</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="" onPress={()=> {}}>
          <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
            <Text className=" text-white text-[14px] font-semibold">Submit Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NepalAddressForm