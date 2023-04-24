import { Box } from '@chakra-ui/react'
import React from 'react'
import { ICourseMeta } from '@shared/interfaces/models/course.interface'
import ContentCard from '@client/components/ContentCard'
import RatingStatistic from './RatingStatistic'

export interface ReviewStatProps {
  meta?: ICourseMeta
}
const ReviewsStat = (props: ReviewStatProps) => {
  if (!props.meta) return <></>
  return (
    <ContentCard title="Student feedback" border="none" display={{ base: 'none', sm: 'flex' }}>
      <Box>
        <RatingStatistic />
      </Box>
    </ContentCard>
  )
}

export default ReviewsStat
