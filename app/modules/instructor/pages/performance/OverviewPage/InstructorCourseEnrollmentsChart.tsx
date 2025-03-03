import { Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useMyChart } from 'app/modules/stats-shared/providers/chart-provider'
import { useCourseChartParams } from 'app/modules/stats-shared/providers/course-chart-params.provider'
import { useInstructorEnrollmentsStatsQuery } from 'app/modules/instructor/queries/instructor-enrollments-stats-query'
import CourseEnrollmentsChart from 'app/modules/stats-shared/components/Charts/CourseEnrollmentsChart'

const Main = (props: InstructorCourseEnrollmentChartProps) => {
  const {
    state: { courseId },
  } = useCourseChartParams()
  const {
    state: { labels, dateRange },
    methods: { standardizedDatasetData },
  } = useMyChart()
  const { isLoading, data: stats } = useInstructorEnrollmentsStatsQuery(dateRange, courseId)
  if (isLoading) return <Skeleton height={'350px'} />
  if (!stats) return <></>
  const data = standardizedDatasetData(stats)
  return <CourseEnrollmentsChart labels={labels} data={data} />
}

export interface InstructorCourseEnrollmentChartProps {}
export default function InstructorCourseEnrollmentsChart(props: InstructorCourseEnrollmentChartProps) {
  return <Main {...props} />
}
