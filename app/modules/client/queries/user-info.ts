import IClientUrlParams from '@admin/interfaces/client-url-params.interface'
import { fetchUserByUsername } from 'app/apis/user/user.api'
import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'

export const RQK_ARCHIVED_COURSES = 'users'

export const useUserInfoQuery = (inputClientQuery?: IClientUrlParams, options?: UseQueryOptions<any>) => {
  const router = useRouter()
  const { userName = '' } = router.query
  return useQuery<any>([RQK_ARCHIVED_COURSES, userName, inputClientQuery], fetchUserByUsername, {
    enabled: !!userName,
    notifyOnChangeProps: ['data'],
    ...options,
  })
}
