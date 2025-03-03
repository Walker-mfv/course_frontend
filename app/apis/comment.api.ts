import { axiosApiInstance } from 'app/utils/axios-utils'
import UrlHelper from 'app/utils/helpers/url.heper'
import IClientUrlParams from '../modules/admin/interfaces/client-url-params.interface'
import IComment from '../modules/shared/interfaces/models/comment.interface'
import { CONTROLLER } from './../utils/constants/app.constant'
const prefix = `${CONTROLLER.comment}`

export async function fetchUnitComments({ queryKey, pageParam = 1 }: any): Promise<IComment[]> {
  const [_key, courseId, unitId, limit]: [string, string, string, number] = queryKey

  const query: IClientUrlParams = {
    _limit: limit,
    _page: pageParam,
  }
  const queryString = UrlHelper.cvtObjToQueryString(query)
  return axiosApiInstance.get(`${prefix}/${courseId}/${unitId}/fetch?${queryString}`).then((res) => res.data)
}

export async function fetchUnitSubComments({ queryKey }: any): Promise<IComment[]> {
  const [_key, courseId, unitId, parentId]: [string, string, string, string] = queryKey

  return axiosApiInstance.get(`${prefix}/${courseId}/${unitId}/${parentId}/fetch-sub?`).then((res) => res.data)
}

export async function countUnitComments(courseId: string, unitId: string): Promise<number> {
  return axiosApiInstance.get(`${prefix}/${courseId}/${unitId}/count`).then((res) => res.data)
}
