import OrderCard from '@admin/pages/performance/orders/OrderCard'
import { Text } from '@chakra-ui/react'
import { useClientOrderDetailQuery } from '@client/queries/client-order-detail-query'
import ListTile from '@shared/components/ListTile'
import AppIcon from 'app/utils/constants/app-icon.constant'

export const CustomerDetailsCard = () => {
  const { isLoading, data } = useClientOrderDetailQuery()
  return (
    <OrderCard
      isLoading={isLoading}
      title="Customer Details"
      data={[
        {
          icon: AppIcon.user,
          label: 'Customer',
          content: (
            <ListTile
              alt={''}
              thumb={data?.history.createdBy.profile.avatar || ''}
              title={data?.history.createdBy.profile.fullName}
              thumbSize="xs"
            />
          ),
        },
        {
          icon: AppIcon.mail,
          label: 'Email',
          content: <Text>{data?.history.createdBy.email}</Text>,
        },
        {
          icon: AppIcon.phone,
          label: 'Phone',
          content: <Text>{data?.history.createdBy.profile.phone}</Text>,
        },
      ]}
    />
  )
}
