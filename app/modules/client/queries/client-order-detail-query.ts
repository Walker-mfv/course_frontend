import IOrderDetail from '@admin/interfaces/order-detail.interface'
import { useAdminUrlParams } from '@admin/providers/admin-query.provider'
import IOrder from '@shared/interfaces/models/order.interface'
import { fetchMyOrderDetail } from 'app/apis/user/user-my-orders.api'
import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'

export const RQK_CLIENT_ORDER_DETAIL = 'client-order-detail'

export function useClientOrderDetailQuery(options?: UseQueryOptions<Omit<IOrder, 'moneyConfiguration'>>) {
  const query = useAdminUrlParams()
  const router = useRouter()
  const { orderId } = router.query

  return useQuery<Omit<IOrderDetail, 'moneyConfiguration'>>(
    [RQK_CLIENT_ORDER_DETAIL, query],
    () => fetchMyOrderDetail(orderId as string),
    {
      keepPreviousData: true,
      enabled: !!orderId,
      notifyOnChangeProps: 'tracked',
      ...options,
    }
  )
}
