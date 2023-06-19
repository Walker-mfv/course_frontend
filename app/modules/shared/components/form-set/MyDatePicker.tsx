import { Stack } from '@chakra-ui/react'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Control, Controller } from 'react-hook-form'
import MyFormLabel from './MyFormLabel'

export interface MyDatePickerProps {
  field: string
  label?: string
  required?: boolean
  control: Control<any>
  showTimeSelect?: boolean
  isClearable?: boolean
  placeholderText?: string
  minDate?: Date
}
export default function MyDatePicker({
  field,
  label,
  required = false,
  control,
  showTimeSelect,
  isClearable = false,
  placeholderText = '',
  minDate,
}: MyDatePickerProps) {
  return (
    <Stack spacing={1}>
      {label && <MyFormLabel required={required}>{label}</MyFormLabel>}
      <Controller
        name={field}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              showTimeSelect={showTimeSelect}
              isClearable={isClearable}
              placeholderText={placeholderText}
              minDate={minDate}
            />
          )
        }}
      />
    </Stack>
  )
}
