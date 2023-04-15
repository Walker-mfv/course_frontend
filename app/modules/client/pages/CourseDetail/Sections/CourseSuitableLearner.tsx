import { useCardBg } from 'app/modules/shared/hooks/style.hook'
import React from 'react'
import ContentCard from 'app/modules/client/components/ContentCard'
import MyContentList from 'app/modules/client/components/MyContentList'
import { useCourseDetailSuitableLearners } from '../../../queries/course-detail-query.hook'

function CourseSuitableLearner() {
  const bgCard = useCardBg()
  const suitableLearners = useCourseDetailSuitableLearners()
  if (suitableLearners?.length == 0) return <></>
  return (
    <ContentCard title="Who this course is for:" bg={bgCard} px={8}>
      <MyContentList data={suitableLearners || []} />
    </ContentCard>
  )
}

export default React.memo(CourseSuitableLearner)
