import { axiosApiInstance } from 'app/utils/axios-utils'

const prefix = 'payments'

export const apiPayPayment = async (id: string): Promise<boolean> => {
  return axiosApiInstance.patch(`${prefix}/pay/${id}`).then((res) => res.data)
}

export const apiPayAllPayment = async (userId: string): Promise<boolean> => {
  return axiosApiInstance.patch(`${prefix}/pay-all/${userId}`).then((res) => res.data)
}
