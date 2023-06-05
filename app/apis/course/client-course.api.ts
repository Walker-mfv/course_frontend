import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import ICountResult from 'app/modules/client/interfaces/count-result.interface'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'

const prefix = `${CONTROLLER.course}/client`

export async function fetchCourseBySlug(slug: string): Promise<ICourse> {
  return axiosApiInstance.get(`${prefix}/slug/${slug}`).then((res) => res.data)
}

// CLIENT APIS
export async function fetchClientCourses({ queryKey }: any): Promise<ICourse[]> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${prefix}/client?${queryString}`).then((res) => res.data)
}

//count filter
export async function countClientFilter({ queryKey }: any): Promise<ICountResult[]> {
  const [_key, clientQuery, fields]: [string, IClientUrlParams, string[]] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  const fieldsString = fields.join(',')
  return axiosApiInstance.get(`${prefix}/count-client-filter/${fieldsString}?${queryString}`).then((res) => res.data)
}

export async function countClientCourses({ queryKey }: any): Promise<number> {
  const [_key, clientQuery]: [string, IClientUrlParams] = queryKey
  const queryString = UrlHelper.cvtObjToQueryString(clientQuery)
  return axiosApiInstance.get(`${prefix}/count-client?${queryString}`).then((res) => res.data)
}

// home:latest items
export async function fetchLatestCourses({ queryKey, pageParam = 1 }: any): Promise<ICourse[]> {
  const [_key, limit] = queryKey
  return axiosApiInstance.get(`${prefix}/latest-items?_page=${pageParam}&_limit=${limit}`).then((res) => res.data)
}

export async function countLatestItems(): Promise<number> {
  return axiosApiInstance.get(`${prefix}/count-latest-items`).then((res) => res.data)
}

// home:most popular items
export async function fetchMostPopularItems({ queryKey, pageParam = 1 }: any): Promise<ICourse[]> {
  const [_key, limit] = queryKey
  return axiosApiInstance.get(`${prefix}/most-popular-items?_page=${pageParam}&_limit=${limit}`).then((res) => res.data)
}

export async function countMostPopularItems(): Promise<number> {
  return axiosApiInstance.get(`${prefix}/count-most-popular-items`).then((res) => res.data)
}

// home:most popular items
export async function fetchHighestRatingItems({ queryKey, pageParam = 1 }: any): Promise<ICourse[]> {
  const [_key, limit] = queryKey
  return axiosApiInstance
    .get(`${prefix}/highest-rating-items?_page=${pageParam}&_limit=${limit}`)
    .then((res) => res.data)
}

export async function countHighestRatingItems(): Promise<number> {
  return axiosApiInstance.get(`${prefix}/count-highest-rating-items`).then((res) => res.data)
}
