import DatePicker from "@/components/date-picker"
import DocumentAttachment from "@/components/document-attachment"
import TextField from "@/components/text-field"
import { pickDocument } from "@/utils/picker"
import NextBtn from "@assets/icons/arrowRightBtn.svg"
import Info from "@assets/icons/information.svg"
import Upload from "@assets/icons/Upload.svg"
import { types } from "@react-native-documents/picker"
import React, { useState } from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import FormProgress from "./components/FormProgress"

interface IProps{
  nextStep: () => void
}

const PersonalDetailForm = ({ nextStep }: IProps) => {
  const [isChecked, setIsChecked] = useState(false)
  
  // attachement
  const [pickedDocument, setPickedDocument] = useState<string[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [removedFiles, setRemovedFiles] = useState<string[]>([])
  const [imageData, setImageData] = useState<string[]>([])

  const handlePickDocument = async () => {
    pickDocument({type: [types.images, types.pdf]}, (result: TODO[]) => {
      if (result?.[0]?.link) {
        setPickedDocument([result[0]])
      }
    })
  }


  const removeFileFromApi = (fileId: string) => {
    setRemovedFiles(prevState => [...prevState, fileId])
    setImageData(prevImages =>
      prevImages.filter(
        (image: TODO) => image.homeworksubmissionfileid !== fileId,
      ),
    )
  }

  const openImageModal = (uri: string) => {
    setSelectedImage(uri)
    setModalVisible(true)
  }

  const removeDocument = (uriToRemove: string) => {
    setPickedDocument(prevState =>
      prevState.filter(uri => uri !== uriToRemove),
    )
  }

  // const compressImage = async (uri: string) => {
  //   try {
  //     const result = await Image.compress(
  //       uri,
  //       {
  //         maxWidth: 1000,
  //         quality: 0.8,
  //       }
  //     )

  //     return result
  //   } catch (err) {
  //     console.log("Error compressing image:", err)
  //     return uri
  //   }
  // }

  const combinedData = [...pickedDocument]
  console.log("removedFiles",removedFiles)
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
            <TextField labelClassName="text-gray-dark-color" name="fullname" placeholder="Enter Full Name"/>
          </View>
          <View className=" mt-5">
            <DatePicker labelClassName="text-gray-dark-color" name="dob"  placeholder="Select Date of Birth"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="citizentype"  placeholder="Enter Citizen Type"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="profession" placeholder="Enter Profession"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="contact" placeholder="Enter Contact Number" keyboardType="number-pad"/>
          </View>
          <View className=" mt-5">
            <TextField labelClassName="text-gray-dark-color" name="email" placeholder="Enter Email Address" />
          </View>
          <View className="flex-1 mt-5">
            <Text className=" text-label font-fw-lg">Upload photo</Text>
            {combinedData.length < 1 && (
              <TouchableOpacity
                className="items-center"
                onPress={handlePickDocument}>
                <Upload width={24} height={24} />
                <Text className="mt-5 text-header-md font-fw-lg">
                    Tap to Upload Image
                </Text>
              </TouchableOpacity>
            )}
            {combinedData.length > 0 && (
              <View>
                <View className="flex-row items-center h-20 mt-5 ">
                  <DocumentAttachment
                    name="photo"
                    pickedDocument={pickedDocument}
                    modalVisible={modalVisible}
                    selectedImage={selectedImage}
                    removeDocument={removeDocument}
                    openImageModal={openImageModal}
                    setModalVisible={setModalVisible}
                    imageData={imageData}
                    removeFileFromApi={removeFileFromApi}
                  />
                </View>
              </View>
            )}
            {combinedData.length < 1 && (
              <View className="mt-5 bg-primary-light">
                <Text className="px-10 py-2 text-center text-primary">
                                  All Format images
                </Text>
              </View>
            )}
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
          {isChecked ?  <View className=" mt-5">
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