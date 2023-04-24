import { Text, HStack } from '@chakra-ui/react'
import React from 'react'
import CourseReviewCount from './CourseGroup/CourseReviewCount'
import RatingStar from './RatingStar'

export interface RatingProps {
  value?: number
  ratingCount?: number
  showLabel?: boolean
  fw?: boolean
  size?: 'md' | 'sm'
}
function Rating({ value = 0, ratingCount, fw = false, showLabel = true, size = 'md', ...props }: RatingProps) {
  const val = Number.parseFloat(value.toFixed(1))
  const starWidth = size == 'md' ? 20 : 14
  return (
    <HStack spacing={1} fontSize={'14px'}>
      {showLabel && (
        <Text fontSize={size} fontWeight={'bold'} color="yellow.600">
          {val}
        </Text>
      )}
      <HStack spacing={0.5} minW={fw ? '90px' : undefined}>
        <RatingStar value={val} w={starWidth + 'px'} />
      </HStack>
      {ratingCount != undefined && <CourseReviewCount size={'14px'}>{ratingCount}</CourseReviewCount>}
    </HStack>
  )
}

export default React.memo(Rating)
