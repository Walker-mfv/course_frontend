import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import IInstructorWithPayment from 'app/modules/admin/interfaces/instructor-with-payment.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = 'user-payment'

export async function fetchInstructorWithPayment(userId: string): Promise<IInstructorWithPayment> {
  return axiosApiInstance.get(`${prefix}/instructor-with-payment/${userId}`).then((res) => res.data)
}

export async function fetchInstructorsWithPayment({ queryKey }: any): Promise<IInstructorWithPayment[]> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${prefix}/instructors-with-payment?${queryString}`).then((res) => res.data)
}

export async function countInstructorsWithPayment({ queryKey }: any): Promise<number> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${prefix}/count-instructors-with-payment?${queryString}`).then((res) => res.data)
}
