import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import { ISelectItem } from 'app/modules/shared/interfaces/select-data.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { TController, TOtherController } from 'app/utils/data/data.type'
import UrlHelper from 'app/utils/helpers/url.heper'

const getPrefix = (name: string) => `${name}`

export async function apiValidateDeletion<T>(ctrl: TController, id: string): Promise<any> {
  return axiosApiInstance.get<T>(`${getPrefix(ctrl)}/validate-deletion/${id}`).then((res) => res.data)
}

export async function fetchById<T>(ctrl: TController, id: string): Promise<T> {
  return axiosApiInstance.get<T>(`${getPrefix(ctrl)}/${id}`).then((res) => res.data)
}

export async function fetchBySlug<T>(ctrl: TController, slug: string): Promise<T> {
  return axiosApiInstance.get<T>(`${getPrefix(ctrl)}/slug/${slug}`).then((res) => res.data)
}

export async function fetchAll<T>({ queryKey }: any): Promise<T[]> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${getPrefix(_key)}?_context=admin&${queryString}`).then((res) => res.data)
}

export const fetchCount = ({ queryKey }: any): Promise<number> => {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${getPrefix(_key)}/count?${queryString}`).then((res) => res.data)
}

export async function fetchSelectDataWithClientQuery({ queryKey }: any): Promise<ISelectItem<string>[]> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${getPrefix(_key)}/select-data?${queryString}`).then((res) => res.data)
}

export async function fetchSelectData(prefix: TController | TOtherController): Promise<ISelectItem<string>[]> {
  return axiosApiInstance.get(`${prefix}/select-data`).then((res) => res.data)
}

export async function apiUpdate<T>(ctrl: TController, id: string, data: Partial<T>): Promise<T> {
  return axiosApiInstance.patch<T>(`${getPrefix(ctrl)}/${id}`, data).then((res) => res.data)
}

export async function apiCreate<T>(ctrl: TController, item: Partial<T>): Promise<T> {
  return axiosApiInstance.post<T>(`${getPrefix(ctrl)}`, item).then((res) => res.data)
}

export async function apiDeleteOne<T>(ctrl: TController, id: string): Promise<T> {
  return axiosApiInstance.delete<T>(`${getPrefix(ctrl)}/${id}?`).then((res) => res.data)
}

export async function apiDeactivate<T>(ctrl: TController, id: string): Promise<T> {
  return axiosApiInstance.patch<T>(`${getPrefix(ctrl)}/deactivate/${id}`).then((res) => res.data)
}

export async function apiReactivate<T>(ctrl: TController, id: string): Promise<T> {
  return axiosApiInstance.patch<T>(`${getPrefix(ctrl)}/reactivate/${id}`).then((res) => res.data)
}

export async function apiDeleteMany<T>(ctrl: TController, ids: string[]): Promise<T[]> {
  const queryString = ids.join(',')
  return axiosApiInstance.delete<T[]>(`${getPrefix(ctrl)}/records?ids=${queryString}`).then((res) => res.data)
}

export async function apiCheckUnique(ctrl: TController, field: string, value: string): Promise<boolean> {
  return axiosApiInstance.get<boolean>(`${getPrefix(ctrl)}/check-unique/${field}/${value}`).then((res) => res.data)
}
