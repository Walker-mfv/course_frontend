import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import ISlider from '../modules/shared/interfaces/models/slider.interface'

const prefix = `${CONTROLLER.slider}`

export async function fetchHomeSliders({ queryKey, pageParam = 1 }: any): Promise<ISlider[]> {
  const [_key, limit] = queryKey
  return axiosApiInstance.get(`${prefix}/home?_page=${pageParam}&_limit=${limit}`).then((res) => res.data)
}

export async function countHomeSliders(): Promise<number> {
  return axiosApiInstance.get(`${prefix}/count-home`).then((res) => res.data)
}
