import { cn } from "@/utils"
import {
  type InputModeOptions,
  type KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from "react-native"
import Label from "../label"

interface IProps {
  editable?: boolean
  placeholder?: string
  value?: string
  rules?: TODO
  keyboardType?: KeyboardTypeOptions
  label?: string
  classname?: string
  valid?: boolean
  maxLength?: number
  inputMode?: InputModeOptions
  onChangeText?: (text: string) => void
  errors?: string
  onChange: (e: TODO) => void
}

const TextFieldWithoutController = ({
  editable,
  placeholder,
  label,
  classname,
  value,
  maxLength,
  inputMode,
  keyboardType,
  rules,
  errors,
  onChange,
}: // ...rest
IProps) => {
  return (
    <View className={cn({})}>
      <View>
        <View className="justify-start">
          <Label title={label} valid={rules ? "*" : undefined} />
          <View
            className={cn(
              classname ,
              "rounded-r-lg  bg-secondary-form-field",
            )}
          >
            <TextInput
              onChangeText={onChange}
              value={value}
              editable={editable}
              inputMode={inputMode}
              keyboardType={keyboardType}
              defaultValue={value}
              maxLength={maxLength}
              placeholder={placeholder}
              className=" text-fs-[14px] py-3"
            />
          </View>
        </View>
        {errors ? <Text className="text-secondary-error-message">{errors as string}</Text> : null}
      </View>
    </View>
  )
}

export default TextFieldWithoutController
