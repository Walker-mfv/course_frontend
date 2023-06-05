import IReview from 'app/modules/shared/interfaces/models/review.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'

const prefix = `reviews`

export const apiCreateUserReview = async (data: Partial<IReview>): Promise<IReview> => {
  return axiosApiInstance.post(`${prefix}`, data).then((res) => res.data)
}

export const fetchUserReview = async (courseId: string): Promise<IReview> => {
  return axiosApiInstance.get(`${prefix}/user-review/${courseId}`).then((res) => res.data)
}

export const apiDeleteUserReview = async (courseId: string): Promise<IReview[]> => {
  return axiosApiInstance.delete(`${prefix}/${courseId}`).then((res) => res.data)
}

export const apiUpdateUserReview = async (courseId: string, data: Partial<IReview>) => {
  return axiosApiInstance.patch(`${prefix}/user-review/${courseId}`, data).then((res) => res.data)
}
