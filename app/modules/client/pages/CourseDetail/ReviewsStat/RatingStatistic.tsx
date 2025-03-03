import { Text, Progress, Stack, HStack, Box, VStack, Heading } from '@chakra-ui/react'
import React from 'react'
import RatingStar from '@client/components/RatingStar'
import ICountResult from '@client/interfaces/count-result.interface'
import { useCourseDetailMeta } from '@client/queries/course-detail-query.hook'

const ratingCountResultData: ICountResult = {
  field: 'ratingCount',
  data: {
    '1': 10,
    '2': 15,
    '3': 0,
    '4': 55,
    '5': 243,
  },
}

const Progresses = () => {
  const meta = useCourseDetailMeta()!
  const ratingCount = meta.ratingCount!
  const html = [...Array(5)].map((_, i) => {
    const value = 5 - i
    const percent = Math.floor((ratingCountResultData.data[value] / ratingCount) * 100)
    return <Progress key={i} value={percent} size="sm" colorScheme="gray" />
  })
  return <Stack spacing={4}>{html}</Stack>
}

const Stars = () => {
  const meta = useCourseDetailMeta()!
  const ratingCount = meta.ratingCount!
  const html = [...Array(5)].map((_, i) => {
    const value = 5 - i
    const percent = Math.floor((ratingCountResultData.data[value] / ratingCount) * 100)
    return (
      <HStack key={i}>
        <Box minW={'100px'}>
          <RatingStar value={value} w={'15px'} />
        </Box>
        <Text fontSize={'15px'} fontWeight={700}>
          {percent}%
        </Text>
      </HStack>
    )
  })
  return <Stack spacing={'2px'}>{html}</Stack>
}

function RatingStatistic() {
  const meta = useCourseDetailMeta()
  if (!meta) return <></>
  const ratingValue = meta.avgRatingScore?.toFixed(1)
  return (
    <Stack flexDir={'row'} gap={5} align="center" w="full">
      <VStack align="center">
        <Heading fontSize={'3.5rem'} color={'var(--chakra-colors-rating-500)'}>
          {ratingValue}
        </Heading>
        <RatingStar value={meta.avgRatingScore || 0} w={'16px'} />
        <Text color="var(--chakra-colors-rating-500)" fontWeight={'bold'}>
          Course Rating
        </Text>
      </VStack>
      <Box flex={1}>
        <Progresses />
      </Box>
      <Stars />
    </Stack>
  )
}

export default React.memo(RatingStatistic)
