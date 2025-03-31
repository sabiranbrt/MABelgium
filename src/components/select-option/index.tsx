
import { cn } from "@/utils/tailwindMerge"
import SelectArrow from "@assets/icons/selectArrow.svg"
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import ActionSheet from "../action-sheet"
import Label from "../label"


export interface IProps<T extends { name: string }>{
  options: T[]
  name: string
  title: string
  placeholder?: string
  rules?: TODO
  label?: string
  className?: string
  labelClassName?: string
  valid?: boolean
}

const SelectOption = <T extends { name: string }> ({
  placeholder,
  label,
  title,
  className,
  rules,
  name,
  labelClassName,
  options,
  ...rest
}: IProps<T>) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  console.log("option",options)
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
            <Label classname={labelClassName} title={label} valid={rules ? "*" : undefined} />
            <Pressable onPress={openMenu}>
              <View>
                <TextInput
                  {...field}
                  editable={false}
                  pointerEvents="none"
                  id={name}
                  placeholder={placeholder}
                  className="text-fs-[14px] p-3 border-[1px] border-primary-light rounded-md text-black"
                />
                <View className="absolute top-4 right-3">
                  <View className="bg-gray-icon-bg h-input px-2 justify-center rounded-tr rounded-br">
                    <SelectArrow width={12} height={12} />
                  </View>
                </View>
              </View>
            </Pressable>
            {errors[name] ? (
              <Text className="text-secondary-error-message">{errors[name]?.message as string}</Text>
            ) : null}
            <ActionSheet title={title} ref={bottomSheetRef} handleCancel={handleCancel}>
              <BottomSheetFlatList data={options} renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    className=""
                    onPress={() => {
                      field.onChange(item.name)
                      handleCancel()
                    }}>
                    <Text className={cn(" text-center py-2")}>{item?.name}</Text>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={(_,index)=> index.toString()}
              />
            </ActionSheet>
          </View>
        )
        
      }}
    />
  )
}

export default SelectOption
