import IClientUrlParams from '@admin/interfaces/client-url-params.interface'
import IOrder from '@shared/interfaces/models/order.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = `my-orders`

export async function fetchMyOrders({ queryKey }: any): Promise<Omit<IOrder, 'moneyConfiguration'>[]> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${prefix}?${queryString}`).then((res) => res.data)
}

export async function fetchMyOrderDetail(id: string): Promise<Omit<IOrder, 'moneyConfiguration'>> {
  return axiosApiInstance.get(`${prefix}/${id}`).then((res) => res.data)
}
