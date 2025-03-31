/* eslint-disable react/display-name */
import SelectArrow from "@assets/icons/selectArrow.svg"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView, type BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import React, { forwardRef, useCallback } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type IProps = {
  children: React.ReactNode
  onClose?: () => void
  handleCancel?:()=> void
  title?: string
  hideArrowIcon?: boolean
  snapPoints?:(string | number)[]
  enableContentPanningGesture?: boolean;
}

const ActionSheet = forwardRef((props: IProps, ref: React.ForwardedRef<BottomSheetModal>) => {
  const {children, onClose,title,handleCancel,hideArrowIcon,snapPoints, enableContentPanningGesture} = props

  const handleSheetChanges = useCallback(() => {
    onClose && onClose()
  }, [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[{...props.style as TODO,backgroundColor: "rgba(0, 0, 0, 0.5)"}]}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
       
      />
    ),
    []
  )

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints ?? ["50%"]}
      enableContentPanningGesture={enableContentPanningGesture}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      enableDynamicSizing={false}
      handleComponent={() => !hideArrowIcon ? <TouchableOpacity className=" p-3 mb-5 flex-row items-center justify-between gap-5" onPress={handleCancel}>
        <View/>
        <Text className=" text-[18px] font-medium">{title}</Text>
        <View>
          <SelectArrow width={16} height={16} />
        </View>
      </TouchableOpacity> : null}
    >
      <BottomSheetView className="flex-1">
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default ActionSheet
