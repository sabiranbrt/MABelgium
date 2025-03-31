
import { cn } from "@/utils/tailwindMerge"
import Calender from "@assets/icons/calender.svg"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Pressable, Text, TextInput, View } from "react-native"
import { Calendar } from "react-native-calendars"
import ActionSheet from "../action-sheet"
import Label from "../label"

export interface IProps {
  name: string
  placeholder?: string
  rules?: TODO
  label?: string
  className?: string
  labelClassName?: string
  valid?: boolean
}

const DatePicker = ({
  placeholder,
  label,
  className,
  rules,
  name,
  labelClassName,
  ...rest
}: IProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const openMenu = () => {
    bottomSheetRef.current?.present()
  }
  const handleCancel = () => {
    bottomSheetRef.current?.dismiss()
  }
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => {
        return (
          <View className={cn(className)}>
            {label ?
              <Label classname={labelClassName} title={label} valid={rules ? "*" : undefined} /> : null}
            <Pressable onPress={openMenu}>
              <View className="relative">
                <TextInput
                  {...field}
                  editable={false}
                  pointerEvents="none"
                  id={name}
                  placeholder={placeholder}
                  className={cn("text-fs-[14px] p-3 border-[1px] border-primary-light rounded-md text-black")}
                />
                <View className="absolute top-3 right-2">
                  <View className="bg-gray-icon-bg h-input px-2 justify-center rounded-tr rounded-br">
                    <Calender width={20} height={20} />
                  </View>
                </View>
              </View>
            </Pressable>
            {errors[name] ? (
              <Text className="text-secondary-error-message">{errors[name]?.message as string}</Text>
            ) : null}
            <ActionSheet title="Choose Date" snapPoints={["60%"]} ref={bottomSheetRef} handleCancel={handleCancel}>
              <View className="">
                <Calendar
                  current={field.value}
                  onDayPress={(value) => {
                    field.onChange(value?.dateString)
                    handleCancel()
                  }}
                />
              </View>
            </ActionSheet>
          </View>
        )
        
      }}
    />
  )
}

export default DatePicker
