import { useAdminOrderDetailQuery } from '@admin/queries/admin-order-detail-query.hook'
import { Text } from '@chakra-ui/react'
import ListTile from '@shared/components/ListTile'
import AppIcon from 'app/utils/constants/app-icon.constant'
import OrderCard from './OrderCard'

export const CustomerDetailsCard = () => {
  const { isLoading, data } = useAdminOrderDetailQuery()
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
