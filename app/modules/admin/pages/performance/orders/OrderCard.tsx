import { Box, Heading, HStack, Icon, Skeleton, Stack, StackDivider, Text } from '@chakra-ui/react'
import Card from 'app/modules/shared/components/Card'
import { useBorderColor, useMutedColor } from 'app/modules/shared/hooks/style.hook'
import React, { ReactNode, useCallback } from 'react'
import { IconType } from 'react-icons'

type TItem = {
  icon: IconType
  label: string
  content: ReactNode
}

export interface OrderCardProps {
  isLoading: boolean
  title: string
  data: TItem[]
}
export default function OrderCard({ data, title, ...props }: OrderCardProps) {
  const mutedColor = useMutedColor()
  const borderColor = useBorderColor()
  const renderContent = useCallback(
    (item: TItem, index) => {
      return (
        <HStack key={index} justify={'space-between'} color={mutedColor}>
          <HStack>
            <Icon fontSize={'xl'} as={item.icon} />
            <Text>{item.label}</Text>
          </HStack>
          <Box fontWeight={'bold'}>{item.content}</Box>
        </HStack>
      )
    },
    [mutedColor]
  )
  return (
    <Card h="full">
      <Skeleton isLoaded={!props.isLoading}>
        <Stack spacing={6}>
          <Heading fontSize={'xl'}>{title}</Heading>
          <Stack spacing={4} divider={<StackDivider color={borderColor} />}>
            {data.map(renderContent)}
          </Stack>
        </Stack>
      </Skeleton>
    </Card>
  )
}
