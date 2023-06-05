import { API_DOMAIN, CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'
import { TFileType } from '../modules/course-form/hooks/my-files-query.hook'
import IFile from '../modules/shared/interfaces/models/file.interface'
import { axiosApiInstance } from './../utils/axios-utils'

const prefix = `${API_DOMAIN}/${CONTROLLER.file}`

export async function apiCreateFile(data: Partial<IFile>): Promise<IFile> {
  return axiosApiInstance.post(`${prefix}`, data).then((res) => res.data)
}

export interface IFileQuery {
  search: string
  fileType: TFileType
}
export async function fetchMyFiles({ queryKey }: any): Promise<IFile[]> {
  const [_key, fileQuery, _page, _limit]: [string, IFileQuery, number, number] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString({
    ...fileQuery,
    _page,
    _limit,
  })
  return axiosApiInstance.get(`${prefix}/my-files?${queryString}`).then((res) => res.data)
}

export async function countMyFiles({ queryKey }: any): Promise<number> {
  const [_key, fileQuery]: [string, IFileQuery] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(fileQuery)
  return axiosApiInstance.get(`${prefix}/count-my-files?${queryString}`).then((res) => res.data)
}
