import { cn } from "@/utils/tailwindMerge"
import React from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"

type ModalType = {
  isModalOpen: boolean
  handleCancel: () => void
  title_odd: string
  title_even: string
  title: string
  headTitle?: string
  handleConfirm: () => void
  classname?: string
}

const ActionModal = ({
  isModalOpen,
  handleCancel,
  headTitle,
  title,
  title_even,
  title_odd,
  handleConfirm,
  classname,
}: ModalType) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isModalOpen}>
      <View className="flex-1 relative items-center justify-center">
        <View className=" bg-black h-full w-full absolute top-0 opacity-60" />
        <View className="bg-white rounded-md py-4 w-[85%] px-3 items-center">
          {headTitle ?  <Text className="text-[24px] font-semibold">{headTitle}</Text>
            : null}
          <View className="mt-2 mb-5">
            <Text className={cn("items-center text-[16px]", classname)}>{title}</Text>
          </View>
          <View className="flex-row items-center">
            <View className="mr-[50px]">
              <TouchableOpacity onPress={handleCancel}>
                <Text className=" text-black text-[16px]">{title_odd}</Text>
              </TouchableOpacity>
            </View>
        
            <TouchableOpacity className="" onPress={handleConfirm}>
              <View className=" flex-row items-center justify-center bg-primary p-3 rounded-md">
                <Text className=" text-white text-[14px] font-semibold">{title_even}</Text>
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ActionModal
