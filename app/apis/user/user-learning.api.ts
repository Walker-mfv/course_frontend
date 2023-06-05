import { ILearnUnit, IUserCourse } from 'app/modules/shared/interfaces/models/user_course.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'

const prefix = `${CONTROLLER.user}/learning`

export async function fetchUserCourseBySlug(courseSlug: string): Promise<IUserCourse> {
  return axiosApiInstance.get(`${prefix}/fetch-by-slug/${courseSlug}`).then((res) => res.data)
}

export async function fetchUserCourse(courseId: string): Promise<IUserCourse> {
  return axiosApiInstance.get(`${prefix}/${courseId}`).then((res) => res.data)
}

export interface ILearnUnitAddress {
  id: string
  unitId: string
}

export async function apiCompletedUnit(data: ILearnUnitAddress): Promise<ILearnUnit> {
  return axiosApiInstance.patch(`${prefix}/completed-unit/${data.id}/${data.unitId}`).then((res) => res.data)
}

export async function apiUncompletedUnit(data: ILearnUnitAddress): Promise<ILearnUnit> {
  return axiosApiInstance.patch(`${prefix}/uncompleted-unit/${data.id}/${data.unitId}`).then((res) => res.data)
}

export async function fetchLearnUnit(userCourseId: string, unitId: string): Promise<ILearnUnit> {
  return axiosApiInstance.get(`${prefix}/${userCourseId}/learn-unit/${unitId}`).then((res) => res.data)
}

export async function updateLearnUnit(
  userCourseId: string,
  unitId: string,
  data: Partial<ILearnUnit>
): Promise<ILearnUnit> {
  return axiosApiInstance.patch(`${prefix}/${userCourseId}/learn-unit/${unitId}`, data).then((res) => res.data)
}
