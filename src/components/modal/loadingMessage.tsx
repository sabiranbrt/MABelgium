import { cn } from "@/utils/tailwindMerge"
import React from "react"
import { ActivityIndicator, Modal, Text, View } from "react-native"

type ModalType = {
  isModalOpen: boolean
  title: string
  subTitle: string
}

const LoadingMessage = ({ isModalOpen, title, subTitle }: ModalType) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isModalOpen}>
        <View className="items-center justify-center flex-1 px-5 bg-secondary-modal-bg">
          <View className={cn(" p-modals-regular rounded-[10px] bg-white w-[90%]")}>
            <View className="flex-row">
              <View className="flex-1 pr-5 space-y-1">
                <Text className="text-primary-white text-fs-header-xl font-fw-lg">
                  {title ?? "Loading..."}
                </Text>
                {subTitle ? (
                  <Text className="text-primary-white text-fs-header-sm font-fw-md">{subTitle}</Text>
                ) : null}
              </View>
              <ActivityIndicator size={40} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default LoadingMessage
