import { CONTROLLER } from 'app/utils/constants/app.constant'
import IOrderDetail from '../modules/admin/interfaces/order-detail.interface'
import { axiosApiInstance } from './../utils/axios-utils'

const prefix = CONTROLLER.order

export async function fetchOrderDetail(id: string): Promise<IOrderDetail> {
  return axiosApiInstance.get(`${prefix}/${id}`).then((res) => res.data)
}
