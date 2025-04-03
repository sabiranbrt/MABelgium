import { cn } from "@/utils/tailwindMerge"
import Calender from "@assets/icons/calender.svg"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useRef, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Calendar } from "react-native-calendars"
import ActionSheet from "../action-sheet"
import Label from "../label"
import { ScrollView } from "react-native-gesture-handler"
import SelectArrow from "@assets/icons/selectArrow.svg"

export interface IProps {
  name: string;
  placeholder?: string;
  rules?: TODO;
  label?: string;
  className?: string;
  labelClassName?: string;
  valid?: boolean;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const DatePicker = ({
  placeholder,
  label,
  className,
  rules,
  name,
  labelClassName,
  ...rest
}: IProps) => {
  const calenderSheetRef = useRef<BottomSheetModal>(null)
  const monthPickerSheetRef = useRef<BottomSheetModal>(null)
  const yearPickerSheetRef = useRef<BottomSheetModal>(null)

  const openMenu = () => calenderSheetRef.current?.present()
  const handleCancel = () => calenderSheetRef.current?.dismiss()

  // Open month picker sheet
  const openMonthPicker = () => {
    monthPickerSheetRef.current?.present()
  }

  // Open year picker sheet
  const openYearPicker = () => {
    yearPickerSheetRef.current?.present()
  }
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  
  const [years] = useState(() => {
    const startYear = 1980
    const endYear = 2045
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
  })

  const { control, formState: { errors } } = useFormContext()

  const handleMonthChange = (month: number) => {
    setCurrentMonth(month -1)
    monthPickerSheetRef.current?.dismiss()
  }
  const handleYearChange = (year: number) => {
    setCurrentYear(year)
    yearPickerSheetRef.current?.dismiss()
  }

  const currentDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => {
        return (
          <View className={cn(className)}>
            {label && (
              <Label classname={labelClassName} title={label} valid={rules ? "*" : undefined} />
            )}
            <Pressable onPress={openMenu}>
              <View className="relative">
                <TextInput
                  {...field}
                  editable={false}
                  pointerEvents="none"
                  id={name}
                  placeholder={placeholder}
                  value={field.value ? new Date(field.value).toLocaleDateString() : ""}
                  className={cn("text-fs-[14px] p-3 border-[1px] border-primary-light rounded-md text-black")}
                />
                <View className="absolute top-3 right-2">
                  <View className="bg-gray-icon-bg h-input px-2 justify-center rounded-tr rounded-br">
                    <Calender width={20} height={20} />
                  </View>
                </View>
              </View>
            </Pressable>
            {errors[name] && (
              <Text className="text-error">{errors[name]?.message as string}</Text>
            )}
            <ActionSheet
              title="Choose Date"
              snapPoints={["60%"]}
              ref={calenderSheetRef}
              handleCancel={handleCancel}
            >
              <View>
                <Calendar
                  key={currentDate}
                  enableSwipeMonths={false}
                  hideArrows
                  theme={{
                    todayBackgroundColor: "#185CAB",
                    todayTextColor: "#fff",
                    textSectionTitleColor: "#000",
                    selectedDayBackgroundColor:"#000"
                  }}
                  
                  current={`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`}
                  renderHeader={() => {
                    return (
                      <View className=" flex-row items-center justify-start gap-x-5 mb-4 w-full">
                        <Pressable
                          onPress={openMonthPicker}
                          className="flex-row items-center gap-x-1"
                        >
                          <Text className="text-lg font-bold text-primary">
                            {months[currentMonth]}
                          </Text>
                          <SelectArrow width={16} height={16} />
                        </Pressable>
                        <Pressable
                          onPress={openYearPicker}
                          className="flex-row items-center gap-x-1"
                        >
                          <Text className="text-lg font-bold text-primary">
                            {currentYear}
                          </Text>
                          <SelectArrow width={16} height={16} />
                        </Pressable>
                      </View>
                    )
                  }
                  }
                  onDayPress={(day) => {
                    field.onChange(day.dateString)
                    console.log("day",day)
                    handleCancel()
                  }}
                />
              </View>
            </ActionSheet>

            {/* Month/Year Picker Modal */}
            <ActionSheet snapPoints={["60%"]} ref={monthPickerSheetRef} title="Select Month">
              <View className="">
                <ScrollView className="" showsVerticalScrollIndicator={false}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      onPress={() => handleMonthChange(index + 1)}
                      className={`py-2 px-3 items-center ${currentMonth === index ? "bg-primary-light" : ""}`}
                    >
                      <Text>{month}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
          
            </ActionSheet>
            <ActionSheet snapPoints={["60%"]} ref={yearPickerSheetRef} title="Select Year">
              <View className="">
                <ScrollView className="" showsVerticalScrollIndicator={false}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      onPress={() => handleYearChange(year)}
                      className={`py-2 px-3 items-center ${currentYear === year ? "bg-primary-light" : ""}`}
                    >
                      <Text>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </ActionSheet>
          </View>
        )
      }}
    />
  )
}

export default DatePicker