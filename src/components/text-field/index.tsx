import { Controller, useFormContext } from "react-hook-form"
import { InputModeOptions, KeyboardTypeOptions, Text, TextInput, View } from "react-native"
import Label from "../label"
import { cn } from "@/utils/tailwindMerge"
import React from "react"


interface IProps {
  editable?: boolean
  name: string
  placeholder?: string
  value?: string
  rules?: TODO
  keyboardType?: KeyboardTypeOptions
  labelClassName?: string
  label?: string
  textCenter?: string
  pointerEvents?: "none" | "box-none" | "box-only" | "auto" | undefined
  valid?: boolean
  maxLength?: number
  inputMode?: InputModeOptions
  onChangeText?: (text: string) => void
}

const TextField = ({
  name,
  editable,
  placeholder,
  label,
  value,
  labelClassName,
  pointerEvents,
  maxLength,
  inputMode,
  keyboardType,
  onChangeText,
  textCenter,
  rules,
  ...rest
}: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <View>
            <View className="justify-start">
              {label ? <Label classname={labelClassName} title={label} valid={rules ? "*" : undefined} />: null}
              <View>
                <TextInput
                  {...field}
                  onChangeText={(text) => {
                    field.onChange(text)
                    if (onChangeText) onChangeText(text)
                  }}
                  id={name}
                  editable={editable}
                  inputMode={inputMode}
                  keyboardType={keyboardType}
                  defaultValue={value}
                  pointerEvents={pointerEvents}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  className={cn("text-fs-[14px] p-3 border-[1px] border-primary-light rounded-md text-black", textCenter)}
                />
              </View>
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
    </View>
  )
}

export default TextField
