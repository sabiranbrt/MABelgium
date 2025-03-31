import ArrowWhiteIcon from "@assets/icons/arrow-white.svg"
import CrosssmallIcon from "@assets/icons/cross-small.svg"
// import PdfImage from "@assets/images/pdflogo.png"
import React from "react"
import { useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface IProps {
  name: string
  rules?: TODO
  pickedDocument: TODO
  modalVisible: boolean
  selectedImage: string
  removeDocument: TODO
  openImageModal?: TODO
  setModalVisible: (value: boolean) => void
  imageData?: TODO | null
  removeFileFromApi?: TODO | null
}

const DocumentAttachment = ({
  name,
  pickedDocument,
  modalVisible,
  removeDocument,
  setModalVisible,
  removeFileFromApi,
  imageData,
  ...rest
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const dimension = Dimensions.get("screen")
  const Width = dimension.width
  // const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const combinedData = [...pickedDocument, ...imageData]
  const flatListRef = useRef<FlatList>(null)

  return (
    <View className="flex-1 items-start">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <View>
            <View>
              <FlatList
                {...field}
                horizontal
                data={combinedData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.homeworkfileid}
                renderItem={({ item }: TODO) => {
                  const imageSource = typeof item === "string" ? { uri: item } : { uri: item.link }
                  // const currentIndex = combinedData.indexOf(item)
                  return (
                    <View>
                      <Pressable
                        onPress={() => {
                          removeDocument(item)
                          removeFileFromApi(
                            item.homeworkfileid || item.homeworkdiscussionfileid || item.homeworksubmissionfileid,
                          )
                        }}
                      >
                        <View className=" relative mx-2">
                          <View
                            className="top-0 right-0 absolute z-30 bg-white rounded-circle-r p-1"
                              
                          >
                            <CrosssmallIcon width={20} height={20} />
                          </View>
                          <View className="relative rounded-circle-r border-[3px] border-primary-light w-[70] h-[70]">
                            <View className="">
                              <View className="absolute top-0 h-full w-full bg-black opacity-25 rounded-circle-r z-40"></View>
                              <Image
                                className=" rounded-circle-r h-full w-full object-cover"
                                source={item.isPdf || item.filetype === "PDF" ? imageSource : imageSource}
                              />
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  )
                }}
              />
            </View>
            {errors[name] ? (
              <Text className="text-secondary-error-message">
                {errors[name]?.message as string}
              </Text>
            ) : null}
          </View>
        )}
        {...rest}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className=" flex-1 bg-black items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false)
            }}
            className=" ml-4 mt-5 self-start"
          >
            <ArrowWhiteIcon width={24} height={24} />
          </TouchableOpacity>
          <View className=" flex-row items-center px-2">
            <FlatList
              horizontal
              pagingEnabled
              snapToAlignment="center"
              data={combinedData}
              keyExtractor={(item) => item.homeworkfileid}
              // initialScrollIndex={selectedImageIndex}
              onScrollToIndexFailed={(info) => {
                setTimeout(() => {
                  if (combinedData.length > info.index) {
                    flatListRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    })
                  }
                }, 100)
              }}
              renderItem={({ item, index }) => {
                const imageSource = typeof item === "string" ? { uri: item } : { uri: item.link }
                return (
                  <View>
                    <Text className=" text-white text-center">
                      {index + 1} / {combinedData?.length}
                    </Text>
                    <View
                      className=" px-2 h-[90%] items-center justify-center"
                      style={{ width: Width }}
                    >
                      <Image
                        style={style.modalImage}
                        source={item.filetype === "Image" ? imageSource : imageSource}
                        className=" w-full h-full"
                      />
                    </View>
                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default DocumentAttachment
const style = StyleSheet.create({
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
})
