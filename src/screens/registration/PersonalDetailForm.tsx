import DatePicker from "@/components/date-picker"
import DocumentAttachment from "@/components/document-attachment"
import TextField from "@/components/text-field"
import NextBtn from "@assets/icons/arrowRightBtn.svg"
import Info from "@assets/icons/information.svg"
import Upload from "@assets/icons/Upload.svg"
import { keepLocalCopy, pick, types } from "@react-native-documents/picker"
import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import FormProgress from "./components/FormProgress"

interface IProps{
  nextStep: () => void
}

type DocumentType = "photo" | "frontId" | "backId";
const PersonalDetailForm = ({ nextStep }: IProps) => {
  const [isChecked, setIsChecked] = useState(false)

  
  const [documents, setDocuments] = useState<Record<DocumentType, string>>({
    photo: "",
    frontId: "",
    backId: ""
  })

  const handlePickDocument = async (type: DocumentType) => {
    try {
      const result = await pick({
        type: [types.images, types.pdf],
        mode: "open",
        allowMultiSelection: false,
        keepLocalCopy: {
          destination: "documentDirectory"
        }
      })

      if (result && result.length > 0) {
        const [copyResult] = await keepLocalCopy({
          files: [{
            uri: result[0].uri,
            fileName: result[0].name || `${type}_${Date.now()}.jpg`,
          }],
          destination: "documentDirectory",
        })
        
        setDocuments(prev => ({
          ...prev,
          [type]: (copyResult as TODO).localUri
        }))
      }
    } catch (err) {
      console.log(`Error picking ${type} document:`, err)
    }
  }

  const removeDocument = (type: DocumentType) => {
    setDocuments(prev => ({
      ...prev,
      [type]: ""
    }))
  }

  return (
    <View className=" flex-1">
      <FormProgress 
        steps={[
          { step: 1, title: "Personal Details" },
          { step: 2, title: "Current Details" },
          { step: 3, title: "Nepal Address" },
        ]}
        currentStep={1} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" my-8">
          <View className=" flex-row items-center gap-x-2">
            <Info width={16} height={16}/>
            <Text className="text-[16px] font-semibold">Personal Details</Text>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="fullname" placeholder="Enter Full Name" rules={{required:"full name required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="father_name" placeholder="Enter Father Name" rules={{required:"father name required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="mother_name" placeholder="Enter Mother Name" rules={{required:"Mother name required*"}}/>
          </View>
          <View className=" mt-5">
            <DatePicker labelClassName="text-gray-dark-color" name="dob"  placeholder="Select Date of Birth" rules={{required:"date required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="citizentype"  placeholder="Enter Citizen Type" rules={{required:"citizentype required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="profession" placeholder="Enter Profession" rules={{required:"profession required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="contact" placeholder="Enter Contact Number" keyboardType="number-pad" rules={{required:"contact required*"}}/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="email" placeholder="Enter Email Address" rules={{required:"email required*"}} />
          </View>
          {/* Profile Photo Upload */}
          <View className="mt-5">
            <Text className="text-label font-fw-lg mb-2">Upload photo</Text>
            {!documents.photo ? (
              <TouchableOpacity
                className="items-center"
                onPress={() => handlePickDocument("photo")}>
                <Upload width={24} height={24} />
                <Text className="mt-5 text-header-md font-fw-lg">
                  Tap to Upload Profile Photo
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="flex-row items-center h-20 mt-5">
                <DocumentAttachment
                  rules={{required: "Profile photo required*"}}
                  name="photo"
                  pickedDocument={documents.photo}
                  removeDocument={() => removeDocument("photo")}
                />
              </View>
            )}
          </View>

          <View className=" flex-row justify-between mt-5">
            {/* Front ID Card Upload */}
            <View className="mt-5">
              <Text className="text-label font-fw-lg mb-2">Front side of ID card</Text>
              {!documents.frontId ? (
                <TouchableOpacity
                  className="items-center gap-y"
                  onPress={() => handlePickDocument("frontId")}>
                  <Upload width={24} height={24} />
                  <Text className="mt-5 text-header-md font-fw-lg">
                  Tap to Upload Front ID
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-row items-center h-20 mt-5">
                  <DocumentAttachment
                    rules={{required: "Front ID required*"}}
                    name="id_card_front"
                    pickedDocument={documents.frontId}
                    removeDocument={() => removeDocument("frontId")}
                  />
                </View>
              )}
            </View>

            {/* Back ID Card Upload */}
            <View className="mt-5">
              <Text className="text-label font-fw-lg mb-2">Back side of ID card</Text>
              {!documents.backId ? (
                <TouchableOpacity
                  className="items-center"
                  onPress={() => handlePickDocument("backId")}>
                  <Upload width={24} height={24} />
                  <Text className="mt-5 text-header-md font-fw-lg">
                  Tap to Upload Back ID
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-row items-center h-20 mt-5">
                  <DocumentAttachment
                    rules={{required: "Back ID required*"}}
                    name="id_card_back"
                    pickedDocument={documents.backId}
                    removeDocument={() => removeDocument("backId")}
                  />
                </View>
              )}
            </View>
          </View>

          <View className=" mt-7">
            <BouncyCheckbox
              size={16}
              fillColor="#185CAB"
              textStyle={{
                fontSize: 12,
                fontWeight:600,
                textDecorationLine: "none",
                color:"#656565"
              }}
              iconStyle={{ borderRadius: 2 }}
              innerIconStyle={{ borderRadius: 2 }}
              text="If already member in Magar Sangh Belgium"
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
          </View>
          {isChecked ? <View className=" mt-5">
            <DatePicker labelClassName="text-gray-dark-color" name="startdate" placeholder="Select Start Date"/>
          </View>: null } 
        </View>
        <View className=" pb-8">
          <TouchableOpacity className="" onPress={nextStep}>
            <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
              <Text className=" text-white text-[14px] font-semibold">CONFIRM & CONTINUE</Text>
              <NextBtn width={20} height={20} fill="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default PersonalDetailForm