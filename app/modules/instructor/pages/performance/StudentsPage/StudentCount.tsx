import React from 'react'
import InstructorFeatureNumber from 'app/modules/instructor/components/InstructorCount'
import { useCountStudentsQuery } from 'app/modules/instructor/queries/students-query.hook'

export const StudentCount = () => {
  const { isLoading, data } = useCountStudentsQuery()
  if (isLoading) return <></>
  return <InstructorFeatureNumber value={data || 0} label="students" />
}
