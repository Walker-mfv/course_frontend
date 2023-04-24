import React from 'react'
import CourseRatingChart from 'app/modules/stats-shared/components/Charts/CourseRatingChart'
import { useCourseChartParams } from 'app/modules/stats-shared/providers/course-chart-params.provider'
import { useInstructorCourseRatingStatsQuery } from 'app/modules/instructor/queries/instructor-course-rating-stats-query.hook'
import { useInstructorOverviewTotalQuery } from 'app/modules/instructor/queries/instructor-overview-total-query.hook'

export interface RatingChartProps {}
export function RatingChart(props: RatingChartProps) {
  const {
    state: { courseId },
  } = useCourseChartParams()
  const { data: total } = useInstructorOverviewTotalQuery('rating', 'all', courseId)
  const { isLoading: isStatsLoading, data: ratingStats } = useInstructorCourseRatingStatsQuery(courseId)
  return <CourseRatingChart isLoading={isStatsLoading} data={ratingStats} total={total} />
}
