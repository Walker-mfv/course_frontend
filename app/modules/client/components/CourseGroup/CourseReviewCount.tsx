import { Text } from '@chakra-ui/react'
import React from 'react'
import { useSubtitleColor } from 'app/modules/shared/hooks/style.hook'

export default function CourseReviewCount({ children: value, size = 'xs' }: { children?: number; size?: any }) {
  const subColor = useSubtitleColor()
  if (value == undefined) return <></>
  return (
    <Text fontSize={size} color={subColor}>
      ({value})
    </Text>
  )
}
