import { HStack, Icon, Text } from '@chakra-ui/react'
import DateHelper from 'app/utils/helpers/date.helper'
import React from 'react'
import { FiClock } from 'react-icons/fi'

export type TTimeType = 'short' | 'long'

export interface TimeProps {
  timestamp?: string
  showIcon?: boolean
  type?: TTimeType
}
export default function Time({ showIcon = true, timestamp, type = 'short' }: TimeProps) {
  if (!timestamp) return <></>
  const date = new Date(timestamp)
  const dateText = type == 'short' ? DateHelper.getShortDate(date) : DateHelper.getLongDate(date)
  if (!showIcon) return <Text>{dateText}</Text>
  return (
    <HStack spacing={2} title={DateHelper.getLongDate(date)}>
      {showIcon && <Icon as={FiClock} />}
      <Text>{dateText}</Text>
    </HStack>
  )
}
