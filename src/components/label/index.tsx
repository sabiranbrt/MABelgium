import { View, Text } from "react-native"
import React from "react"
import { cn } from "@/utils/tailwindMerge"

type LabelValidation = {
  title: string | undefined
  valid: string | undefined
  classname?: string | undefined
}

const Label = ({ title, valid,classname }: LabelValidation) => {
  return (
    <View>
      <Text className={cn("text-fs-label font-fw-lg mb-[2px]",classname)}>
        {title}
        <Text className="text-secondary-error-message">{valid}</Text>
      </Text>
    </View>
  )
}

export default Label
