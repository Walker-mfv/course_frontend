import IClientUrlParams from 'app/modules/admin/interfaces/client-url-params.interface'
import IReview from 'app/modules/shared/interfaces/models/review.interface'
import { axiosApiInstance } from 'app/utils/axios-utils'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import UrlHelper from 'app/utils/helpers/url.heper'

const getPrefix = (id: string) => `${CONTROLLER.course}/${id}/reviews`

// CLIENT APIS
export async function fetchCourseReviews({ queryKey, pageParam = 1 }: any): Promise<IReview[]> {
  const [_key, courseId, limit, filterStar]: [string, string, number, number | undefined] = queryKey

  const query: IClientUrlParams = {
    _limit: limit,
    _page: pageParam,
    rating_filter: filterStar,
  }
  const queryString = UrlHelper.cvtObjToQueryString(query)
  return axiosApiInstance.get(`${getPrefix(courseId)}?${queryString}`).then((res) => res.data)
}

export async function countCourseReviews(courseId: string, filterStar?: number): Promise<number> {
  const queryString = typeof filterStar != 'undefined' ? `rating_filter=${filterStar}` : ''
  return axiosApiInstance.get(`${getPrefix(courseId)}/count?${queryString}`).then((res) => res.data)
}
