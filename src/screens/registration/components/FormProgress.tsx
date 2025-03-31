import { cn } from "@/utils/tailwindMerge"
import React from "react"
import { Text, View } from "react-native"
import Tick from "@assets/icons/tick.svg"

interface Step {
  step: number;
  title: string;
}

interface IProps {
  steps: Step[];
  currentStep: number;
}

const FormProgress = ({ steps, currentStep }: IProps) => {
  return (
    <View className=" flex-row items-center justify-between">
      {steps.map(({ step, title }) => (
        <View key={step} className="flex-row items-center gap-x-2 my-3 p-1">
          <View className="border-thin p-0.5 rounded-full">
            <View className={cn(
              "h-4 w-4 items-center justify-center rounded-full bg-gray-light-color",
              step <= currentStep && "bg-primary"
            )}>
              {step <= currentStep ? <Tick /> : <Text className="text-[8px] font-medium">{step}</Text>}
            </View>
          </View>
          <Text className="text-[10px] font-semibold">{title}</Text>
        </View>
      ))}
    </View>
  )
}

export default FormProgress
