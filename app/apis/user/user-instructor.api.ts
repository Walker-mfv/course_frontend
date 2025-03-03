import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import IInstructorCourse from 'app/modules/instructor/interfaces/instructor-course.interface'
import IPaymentTransaction from 'app/modules/instructor/interfaces/payment-transaction.interface'
import IStudent from 'app/modules/instructor/interfaces/student.interface'
import { TOverviewTotal } from 'app/modules/instructor/types/overview-total.type'
import { TTotalRange } from 'app/modules/instructor/types/total-range.type'
import IPayment from 'app/modules/shared/interfaces/models/payment.interface'
import IReview, { IReviewResponse } from 'app/modules/shared/interfaces/models/review.interface'
import { IRatingStat } from 'app/modules/shared/interfaces/rating-stat.interface'
import { IStat } from 'app/modules/shared/interfaces/stat.interface'
import { IDateRange } from 'app/modules/stats-shared/providers/chart-provider'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = `${CONTROLLER.user}/instructor`
export async function fetchInstructorCourseReviews({ queryKey, pageParam = 1 }: any): Promise<IReview[]> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  clientQuery._page = pageParam
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/reviews?${queryString}`).then((res) => res.data)
}

export async function countInstructorCourseReviews({ queryKey, pageParam = 1 }: any): Promise<number> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  clientQuery._page = pageParam
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/count-reviews?${queryString}`).then((res) => res.data)
}

export async function fetchStudents({ queryKey }: any): Promise<IStudent[]> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/students?${queryString}`).then((res) => res.data)
}

export async function countStudents({ queryKey }: any): Promise<number> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/count-students?${queryString}`).then((res) => res.data)
}

export async function fetchPendingPayments(viewInstructorId?: string): Promise<IPayment[]> {
  const queryString = viewInstructorId ? `viewInstructorId=${viewInstructorId}` : ''
  return axiosApiInstance.get(`${prefix}/pending-payments?${queryString}`).then((res) => res.data)
}

export async function fetchPayment(paymentId: string): Promise<IPayment> {
  return axiosApiInstance.get(`${prefix}/payment/${paymentId}`).then((res) => res.data)
}

export async function fetchPayments({ queryKey }: any): Promise<IPayment[]> {
  const [_key, viewInstructorId, clientQuery, _page, _limit]: [
    string,
    string | undefined,
    IClientUrlParams,
    number,
    number
  ] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({
    ...clientQuery,
    viewInstructorId,
    _limit,
    _page,
  })
  return axiosApiInstance.get(`${prefix}/payments?${queryString}`).then((res) => res.data)
}

export async function countPayments({ queryKey }: any): Promise<number> {
  const [_key, viewInstructorId, clientQuery]: [string, string | undefined, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/count-payments?${queryString}`).then((res) => res.data)
}

export async function fetchPaymentTransactions({ queryKey }: any): Promise<IPaymentTransaction[]> {
  const [_key, clientQuery, paymentId, _page, _limit]: [string, IClientUrlParams, string, number, number] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({
    ...clientQuery,
    _page,
    _limit,
  })
  return axiosApiInstance.get(`${prefix}/payment-transactions/${paymentId}?${queryString}`).then((res) => res.data)
}

export async function countPaymentTransactions({ queryKey }: any): Promise<number> {
  const [_key, clientQuery, paymentId]: [string, IClientUrlParams, string] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery })
  return axiosApiInstance
    .get(`${prefix}/count-payment-transactions/${paymentId}?${queryString}`)
    .then((res) => res.data)
}

export async function fetchInstructorCourses({ queryKey }: any): Promise<IInstructorCourse[]> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/courses?${queryString}`).then((res) => res.data)
}

export async function countInstructorCourses({ queryKey }: any): Promise<number> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/count-courses?${queryString}`).then((res) => res.data)
}

export async function fetchPaymentDetails({ queryKey }: any): Promise<IInstructorCourse[]> {
  const [_key, clientQuery, viewInstructorId]: [string, IClientUrlParams, string | undefined] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({ ...clientQuery, viewInstructorId })
  return axiosApiInstance.get(`${prefix}/courses?${queryString}`).then((res) => res.data)
}

// REVIEWS
export async function apiUpdateReviewResponse(id: string, data: Partial<IReviewResponse>): Promise<boolean> {
  return axiosApiInstance.patch(`${prefix}/update-review-response/${id}`, data).then((res) => res.data)
}
export async function apiDeleteReviewResponse(id: string): Promise<boolean> {
  return axiosApiInstance.patch(`${prefix}/delete-review-response/${id}`).then((res) => res.data)
}

export async function fetchInstructorStats(
  type: TOverviewTotal,
  data: IDateRange,
  courseId?: string,
  viewInstructorId?: string
): Promise<IStat[]> {
  const queryString = UrlHelper.cvtObjToQueryString({
    ...data,
    'course._id_filter': courseId,
    viewInstructorId,
  })
  return axiosApiInstance.get(`${prefix}/${type}-stats?${queryString}`).then((res) => res.data)
}

export async function fetchInstructorCourseRatingStats(
  courseId?: string,
  viewInstructorId?: string
): Promise<IRatingStat[]> {
  const queryString = UrlHelper.cvtObjToQueryString({
    'course._id_filter': courseId,
    viewInstructorId,
  })
  return axiosApiInstance.get(`${prefix}/course-rating-stats?${queryString}`).then((res) => res.data)
}

export async function fetchInstructorTotal(
  type: TOverviewTotal,
  range: TTotalRange,
  courseId?: string,
  viewInstructorId?: string
): Promise<number> {
  const queryString = UrlHelper.cvtObjToQueryString({
    range: range,
    'course._id_filter': courseId,
    viewInstructorId,
  })
  return axiosApiInstance.get(`${prefix}/total-${type}?${queryString}`).then((res) => res.data)
}

export async function fetchInstructorAvgCourseRating(
  range: TTotalRange,
  courseId?: string,
  viewInstructorId?: string
): Promise<number> {
  const queryString = UrlHelper.cvtObjToQueryString({
    range: range,
    'course._id_filter': courseId,
    viewInstructorId,
  })
  return axiosApiInstance.get(`${prefix}/avg-course-rating?${queryString}`).then((res) => res.data)
}
