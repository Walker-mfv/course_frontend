import { useAdminOrderDetailQuery } from '@admin/queries/admin-order-detail-query.hook'
import { HStack, Image, Text } from '@chakra-ui/react'
import Price from 'app/modules/shared/components/Price'
import AppIcon from 'app/utils/constants/app-icon.constant'
import AppImg from 'app/utils/constants/app-img.constant'
import DateHelper from 'app/utils/helpers/date.helper'
import { FiCalendar } from 'react-icons/fi'
import OrderCard from './OrderCard'

export const OrderDetailsCard = () => {
  const { isLoading, data } = useAdminOrderDetailQuery()

  return (
    <OrderCard
      isLoading={isLoading}
      title="Order Details"
      data={[
        {
          icon: FiCalendar,
          label: 'Created At',
          content: <Text>{data && DateHelper.getShortDate(new Date(data.history.createdAt))} </Text>,
        },
        {
          icon: AppIcon.payment,
          label: 'Payment Method',
          content: (
            <HStack>
              <Image maxW={'20px'} src={AppImg.MOMO_LOGO} alt="" />
              <Text>MoMo</Text>
            </HStack>
          ),
        },
        {
          icon: AppIcon.money,
          label: 'Total Price',
          content: <Price value={data?.totalPrice} />,
        },
      ]}
    />
  )
}
