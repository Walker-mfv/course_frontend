import { axiosApiInstance } from 'app/utils/axios-utils'
import IConfiguration from '../modules/shared/interfaces/models/configuration.interface'

const prefix = 'configuration'

export async function fetchConfiguration(): Promise<IConfiguration> {
  return axiosApiInstance.get(`${prefix}`).then((res) => res.data)
}

export async function fetchPriceTiers(): Promise<number[]> {
  return axiosApiInstance.get(`${prefix}/price-tiers`).then((res) => res.data)
}

export async function updateConfiguration(data: Partial<IConfiguration>): Promise<IConfiguration> {
  return axiosApiInstance.patch(`${prefix}`, data).then((res) => res.data)
}
