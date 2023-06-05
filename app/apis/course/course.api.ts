import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'

const prefix = CONTROLLER.course
export const fetchCourseBriefById = async (id: string): Promise<ICourse> => {
  return axiosApiInstance.get(`${prefix}/brief/${id}`).then((res) => res.data)
}

export type TApproveStatus = 'active' | 'rejected'
export const apiApproveCourse = async (id: string, status: TApproveStatus): Promise<boolean> => {
  return axiosApiInstance.patch(`${prefix}/approve/${id}`, { status }).then((res) => res.data)
}

export const apiSubmitForReview = async (id: string): Promise<boolean> => {
  return axiosApiInstance.patch(`${prefix}/submit-for-review/${id}`).then((res) => res.data)
}

export const apiConvertCourseToDraft = async (id: string): Promise<boolean> => {
  return axiosApiInstance.patch(`${prefix}/convert-course-to-draft/${id}`).then((res) => res.data)
}

export const apiConvertCourseToInActive = async (id: string): Promise<boolean> => {
  return axiosApiInstance.patch(`${prefix}/convert-course-to-inactive/${id}`).then((res) => res.data)
}
