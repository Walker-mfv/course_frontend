import {
  AspectRatio,
  Box,
  GridItem,
  SimpleGrid,
  Skeleton,
  SkeletonProps,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'

const CourseSekeleton = () => {
  return (
    <Stack px={2}>
      <Skeleton borderRadius={'lg'}>
        <AspectRatio ratio={16 / 9} w="full">
          <div></div>
        </AspectRatio>
      </Skeleton>
      <TitleSkeleton />
      <TitleSkeleton />
      <AuthorSkeleton />
      <PriceSkeleton />
      <RatingSkeleton />
    </Stack>
  )
}

export const TitleSkeleton = (props: SkeletonProps) => {
  return <Skeleton w="150px" h="20px" {...props} />
}

export const AuthorSkeleton = (props: SkeletonProps) => {
  return <Skeleton w="100px" h="28px" {...props} />
}

export const RatingSkeleton = (props: SkeletonProps) => {
  return <Skeleton w="170px" h="24px" {...props} />
}

export const PriceSkeleton = (props: SkeletonProps) => {
  return <Skeleton w="80px" h="21px" {...props} />
}

function CourseGroupSkeleton() {
  const renderItem = useCallback((_, i) => {
    return (
      <GridItem key={i}>
        <CourseSekeleton />
      </GridItem>
    )
  }, [])
  const length = useBreakpointValue([2, 3, 4, 5])
  return (
    <SimpleGrid spacing={2} columns={length}>
      {[...Array(length)].map(renderItem)}
    </SimpleGrid>
  )
}

export default React.memo(CourseGroupSkeleton)
