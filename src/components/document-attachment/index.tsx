import CrosssmallIcon from "@assets/icons/cross-small.svg"
// import PdfImage from "@assets/images/pdflogo.png"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Image, Pressable, Text, View } from "react-native"

interface IProps {
  name: string
  rules?: TODO
  pickedDocument: TODO
  removeDocument: TODO
}

const DocumentAttachment = ({
  name,
  pickedDocument,
  removeDocument,
  ...rest
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <View className="flex-1 items-start">
     
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <View>
              <View>
                <Pressable
                  onPress={() => {
                    removeDocument(pickedDocument)
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
                          source={{ uri: field.value }}
                        />
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
              {errors[name] ? (
                <Text className="text-secondary-error">
                  {errors[name]?.message as string}
                </Text>
              ) : null}
            </View>
          )
        }
        }
        {...rest}
      />
    </View>
  )
}

export default DocumentAttachment

