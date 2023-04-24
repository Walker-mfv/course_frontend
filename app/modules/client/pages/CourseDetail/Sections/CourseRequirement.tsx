import React from 'react'
import ContentCard from 'app/modules/client/components/ContentCard'
import MyContentList from 'app/modules/client/components/MyContentList'
import { useCourseDetailRequirements } from '../../../queries/course-detail-query.hook'
import { useContentCardBg } from 'app/modules/shared/hooks/style.hook'

function CourseRequirement() {
  const bgCard = useContentCardBg()
  const requirements = useCourseDetailRequirements()
  if (requirements?.length == 0) return <></>
  return (
    <ContentCard title={'Requirements'} bg={bgCard} px={8}>
      <MyContentList spacing={4} data={requirements || []} />
    </ContentCard>
  )
}

export default React.memo(CourseRequirement)
