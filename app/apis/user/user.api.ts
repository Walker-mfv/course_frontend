import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import { ICart, IUser } from 'app/modules/shared/interfaces/models/user.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = `${CONTROLLER.user}`

export const updateMe = (user: Partial<IUser>): Promise<void> => {
  return axiosApiInstance.patch(`/${prefix}/me`, user).then((res) => res.data)
}

export const apiSwitchToInstructor = (): Promise<void> => {
  return axiosApiInstance.patch(`/${prefix}/me/switch-to-instructor`).then((res) => res.data)
}

export const apiUpdateCart = (cart: ICart): Promise<void> => {
  return axiosApiInstance.patch(`/${prefix}/cart`, cart).then((res) => res.data)
}
export const apiAddCourseToCart = (courseId: string): Promise<void> => {
  return axiosApiInstance
    .post(`/${prefix}/cart`, {
      courseId,
    })
    .then((res) => res.data)
}

export const apiDeleteCourseInCart = (courseId: string): Promise<void> => {
  return axiosApiInstance.delete(`/${prefix}/cart/${courseId}`).then((res) => res.data)
}

export const apiCheckoutMomo = async (): Promise<string> => {
  return axiosApiInstance.post(`/${prefix}/cart/checkout-momo`).then((res) => res.data)
}

export const fetchCart = (): Promise<ICart> => {
  return axiosApiInstance.get(`/${prefix}/cart`).then((res) => res.data)
}

export const apiEditProfile = (data: Partial<IUser>): Promise<IUser> => {
  return axiosApiInstance.patch(`/${prefix}/me/profile`, data).then((res) => res.data)
}

export const fetchUserByUsername = ({ queryKey }: any): Promise<any> => {
  const [_key, username, clientQuery]: [string, string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  // if (!username) return Promise.resolve(null)
  return axiosApiInstance.get(`/${prefix}/info/${username}?${queryString}`).then((res) => res.data)
}
