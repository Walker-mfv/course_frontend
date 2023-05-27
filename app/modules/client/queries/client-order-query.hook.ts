import { useAdminUrlParams } from '@admin/providers/admin-query.provider'
import IOrder from '@shared/interfaces/models/order.interface'
import { fetchById } from 'app/apis/acp/admin.api'
import { fetchMyOrders } from 'app/apis/user/user-my-orders.api'
import { TController } from 'app/utils/data/data.type'
import { useQuery, UseQueryOptions } from 'react-query'

const RQK_CLIENT_FETCH_BY_ID = 'client-fetch-by-id'

export function useFetchById<T>(ctrl: TController, id?: string) {
  return useQuery<T>([RQK_CLIENT_FETCH_BY_ID, id], () => fetchById<T>(ctrl, id!), {
    notifyOnChangeProps: 'tracked',
    enabled: !!id,
  })
}

export function useClientTableRows(options?: UseQueryOptions<Omit<IOrder, 'moneyConfiguration'>[]>) {
  const query = useAdminUrlParams()

  return useQuery<Omit<IOrder, 'moneyConfiguration'>[]>([RQK_CLIENT_FETCH_BY_ID, query], fetchMyOrders, {
    notifyOnChangeProps: 'tracked',
    ...options,
  })
}
