import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import { ICalendarEvent, ICart, IUser } from 'app/modules/shared/interfaces/models/user.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = `${CONTROLLER.user}`

export const updateMe = async (user: Partial<IUser>): Promise<void> => {
  return axiosApiInstance.patch(`/${prefix}/me`, user).then((res) => res.data)
}

export const apiSwitchToInstructor = async (): Promise<void> => {
  return axiosApiInstance.patch(`/${prefix}/me/switch-to-instructor`).then((res) => res.data)
}

export const apiUpdateCart = async (cart: ICart): Promise<void> => {
  return axiosApiInstance.patch(`/${prefix}/cart`, cart).then((res) => res.data)
}

export const apiAddCourseToCart = async (courseId: string): Promise<void> => {
  return axiosApiInstance
    .post(`/${prefix}/cart`, {
      courseId,
    })
    .then((res) => res.data)
}

export const apiDeleteCourseInCart = async (courseId: string): Promise<void> => {
  return axiosApiInstance.delete(`/${prefix}/cart/${courseId}`).then((res) => res.data)
}

export const apiCheckoutMomo = async (): Promise<string> => {
  return axiosApiInstance.post(`/${prefix}/cart/checkout-momo`).then((res) => res.data)
}

export const fetchCart = async (): Promise<ICart> => {
  return axiosApiInstance.get(`/${prefix}/cart`).then((res) => res.data)
}

export const apiEditProfile = async (data: Partial<IUser>): Promise<IUser> => {
  return axiosApiInstance.patch(`/${prefix}/me/profile`, data).then((res) => res.data)
}

export const fetchUserByUsername = async ({ queryKey }: any): Promise<any> => {
  const [_key, username, clientQuery]: [string, string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`/${prefix}/info/${username}?${queryString}`).then((res) => res.data)
}

export const checkAuthCalendar = async (): Promise<boolean> => {
  return axiosApiInstance.get(`/${prefix}/me/google/calendar/check-auth`).then((res) => res.data)
}

export const createCalendarEvent = async (data: any): Promise<any> => {
  return axiosApiInstance.post(`/${prefix}/me/google/calendar/create-event`, data).then((res) => res.data)
}

export const fetchCalendarEvents = async (): Promise<ICalendarEvent[]> => {
  return axiosApiInstance.get(`/${prefix}/me/google/calendar/events`).then((res) => res.data)
}

export const deleteCalendarEvent = async (eventId: string): Promise<any> => {
  return axiosApiInstance.delete(`/${prefix}/me/google/calendar/events/${eventId}`).then((res) => res.data)
}
