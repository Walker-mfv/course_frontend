import { Stack, Text } from '@chakra-ui/react'
import { IActivityLog } from '@shared/interfaces/models/activity-log.interface'
import React from 'react'

export interface ClientInfoProps {
  activityLog: IActivityLog
}
export default function ClientInfo({ activityLog }: ClientInfoProps) {
  return (
    <Stack>
      <Text>Type: {activityLog.deviceInfo.client.type}</Text>
      <Text>Name: {activityLog.deviceInfo.client.name}</Text>
    </Stack>
  )
}
