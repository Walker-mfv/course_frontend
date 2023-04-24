import React from 'react'
import CourseRatingChart from 'app/modules/stats-shared/components/Charts/CourseRatingChart'
import { useCourseChartParams } from 'app/modules/stats-shared/providers/course-chart-params.provider'
import { useAdminCourseRatingStatsQuery } from '@admin/queries/admin-course-rating-stats-query.hook copy'
import { useAdminOverviewTotalQuery } from '@admin/queries/admin-overview-total-query.hook'

export interface AdminCourseRatingChartProps {}
export function AdminCourseRatingChart(props: AdminCourseRatingChartProps) {
  const {
    state: { courseId },
  } = useCourseChartParams()
  const { data: total } = useAdminOverviewTotalQuery('rating', 'all', courseId)
  const { isLoading: isStatsLoading, data: ratingStats } = useAdminCourseRatingStatsQuery(courseId)
  return <CourseRatingChart isLoading={isStatsLoading} data={ratingStats} total={total} />
}
