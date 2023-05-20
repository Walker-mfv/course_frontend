import { ICategory } from '@shared/interfaces/models/category.interface'
import { fetchBySlug } from 'app/apis/acp/admin.api'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useQuery, UseQueryOptions } from 'react-query'

export const RQK_CAT_DETAIL = 'cat-detail'

export const getCatDetailSlug = (params: ParsedUrlQuery) => {
  const { catSlugs = [] } = params
  const [primarySlug, subSlug] = catSlugs as string[]
  const slug = subSlug ? subSlug : primarySlug
  return slug
}

export const useCatDetailQuery = (options?: UseQueryOptions<ICategory>) => {
  const router = useRouter()
  const slug = getCatDetailSlug(router.query)
  return useQuery<ICategory>([RQK_CAT_DETAIL, slug], () => fetchBySlug<ICategory>('categories', slug), {
    enabled: !!slug,
    notifyOnChangeProps: 'tracked',
    ...options,
  })
}
