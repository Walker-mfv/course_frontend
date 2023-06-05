import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'
import IClientUrlParams from '../modules/admin/interfaces/client-url-params.interface'
import INotification from '../modules/shared/interfaces/models/notification.interface'
const prefix = `${CONTROLLER.notification}/me`

export const fetchMyNotifications = async ({ queryKey, pageParam: _page }: any): Promise<INotification[]> => {
  const [_key, _limit]: [string, number] = queryKey

  const query: IClientUrlParams = {
    _limit,
    _page,
  }
  const queryString = UrlHelper.cvtObjToQueryString(query)
  return axiosApiInstance.get(`${prefix}?${queryString}`).then((res) => res.data)
}

export const countMyNotifications = async (): Promise<number> => {
  return axiosApiInstance.get(`${prefix}/count?`).then((res) => res.data)
}

export const countMyUnreadNotifications = async (): Promise<number> => {
  return axiosApiInstance.get(`${prefix}/count-unread?`).then((res) => res.data)
}

export const countMyNewNotifications = async (): Promise<number> => {
  return axiosApiInstance.get(`${prefix}/count-new?`).then((res) => res.data)
}

// actions
export const apiReachNewNotifications = async (): Promise<number> => {
  return axiosApiInstance.patch(`${prefix}/reach-new?`).then((res) => res.data)
}

export const apiReadNotification = async (notificationId: string): Promise<number> => {
  return axiosApiInstance.patch(`${prefix}/read/${notificationId}?`).then((res) => res.data)
}
