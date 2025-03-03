import { IDateRange } from '../../stats-shared/providers/chart-provider'
import { useQuery, UseQueryOptions } from 'react-query'
import { fetchInstructorStats } from 'app/apis/user/user-instructor.api'
import { IStat } from '@shared/interfaces/stat.interface'
import { useInstructorParams } from '../providers/instructor-params.provider'

export const RQK_INSTRUCTOR_ENROLLMENTS_STATS = 'instructor-enrollments-stats'
export const useInstructorEnrollmentsStatsQuery = (
  dateRange: IDateRange,
  courseId?: string,
  options?: UseQueryOptions<IStat[]>
) => {
  const {
    state: { viewInstructorId },
  } = useInstructorParams()
  return useQuery<IStat[]>(
    [RQK_INSTRUCTOR_ENROLLMENTS_STATS, dateRange, courseId],
    () => fetchInstructorStats('enrollments', dateRange, courseId, viewInstructorId),
    {
      staleTime: Infinity,
      notifyOnChangeProps: 'tracked',
      keepPreviousData: true,
      ...options,
    }
  )
}
