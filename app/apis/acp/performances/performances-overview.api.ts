import { TOverviewTotal } from 'app/modules/instructor/types/overview-total.type'
import { TTotalRange } from 'app/modules/instructor/types/total-range.type'
import { IRatingStat } from 'app/modules/shared/interfaces/rating-stat.interface'
import { IStat } from 'app/modules/shared/interfaces/stat.interface'
import { IDateRange } from 'app/modules/stats-shared/providers/chart-provider'
import { axiosApiInstance } from 'app/utils/axios-utils'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = `performances/overview`

export async function fetchStats(type: TOverviewTotal, data: IDateRange, courseId?: string): Promise<IStat[]> {
  const queryString = UrlHelper.cvtObjToQueryString({
    ...data,
    'course._id_filter': courseId,
  })
  return axiosApiInstance.get(`${prefix}/${type}-stats?${queryString}`).then((res) => res.data)
}

export async function fetchCourseRatingStats(courseId?: string): Promise<IRatingStat[]> {
  const queryString = UrlHelper.cvtObjToQueryString({
    'course._id_filter': courseId,
  })
  return axiosApiInstance.get(`${prefix}/course-rating-stats?${queryString}`).then((res) => res.data)
}

export async function fetchOverviewTotal(type: TOverviewTotal, range: TTotalRange, courseId?: string): Promise<number> {
  const queryString = UrlHelper.cvtObjToQueryString({
    range: range,
    'course._id_filter': courseId,
  })
  return axiosApiInstance.get(`${prefix}/total-${type}?${queryString}`).then((res) => res.data)
}

export async function fetchAvgCourseRating(range: TTotalRange, courseId?: string): Promise<number> {
  const queryString = UrlHelper.cvtObjToQueryString({
    range: range,
    'course._id_filter': courseId,
  })
  return axiosApiInstance.get(`${prefix}/avg-course-rating?${queryString}`).then((res) => res.data)
}
