import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import { IUserCourse } from 'app/modules/shared/interfaces/models/user_course.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'

const prefix = `${CONTROLLER.user}/my-courses`

export const fetchLearningCourses = async (): Promise<IUserCourse[]> => {
  return axiosApiInstance.get(`/${prefix}/learning`).then((res) => res.data)
}

export const fetchLearningCourseIds = async (): Promise<string[]> => {
  return axiosApiInstance.get(`/${prefix}/learning-course-ids`).then((res) => res.data)
}

export const fetchArchivedCourses = async (): Promise<IUserCourse[]> => {
  return axiosApiInstance.get(`/${prefix}/archived`).then((res) => res.data)
}

export async function apiArchiveCourses(userCourseIds: string[]): Promise<void> {
  return axiosApiInstance
    .patch(`${prefix}/archive`, {
      userCourseIds,
    })
    .then((res) => res.data)
}

export async function apiUnArchiveCourses(userCourseIds: string[]): Promise<void> {
  return axiosApiInstance
    .patch(`${prefix}/unarchive`, {
      userCourseIds,
    })
    .then((res) => res.data)
}

// wishlist
export const fetchWishlist = async (): Promise<ICourse[]> => {
  return axiosApiInstance.get(`/${prefix}/wishlist`).then((res) => res.data)
}

export const countWishlist = async (): Promise<number> => {
  return axiosApiInstance.get(`/${prefix}/count-wishlist`).then((res) => res.data)
}

export const fetchWishlistCourseIds = async (): Promise<string[]> => {
  return axiosApiInstance.get(`/${prefix}/wishlist-course-ids`).then((res) => res.data)
}

export async function apiAddToWishlist(courseIds: string[]): Promise<void> {
  return axiosApiInstance
    .patch(`${prefix}/add-to-wishlist`, {
      courseIds,
    })
    .then((res) => res.data)
}
export async function apiDeleteFromWishlist(courseIds: string[]): Promise<void> {
  return axiosApiInstance
    .patch(`${prefix}/delete-from-wishlist`, {
      courseIds,
    })
    .then((res) => res.data)
}
