import { GridItem, SimpleGrid, Stack } from '@chakra-ui/react'
import ClientLayout from '@client/ClientLayout'
import ClientPageContainer from '@client/components/ClientPageContainer'
import { CustomerDetailsCard } from '@client/pages/MyOrders/CustomerDetailsCard'
import { OrderDetailsCard } from '@client/pages/MyOrders/OrderDetailsCard'
import { useClientOrderDetailQuery } from '@client/queries/client-order-detail-query'
import { BadRequest } from '@shared/parts/BadRequest'
import OrderCourses from 'app/modules/admin/pages/performance/orders/OrderCourses'
import Card from 'app/modules/shared/components/Card'
import MyHead from 'app/modules/shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'

const Page: NextPageWithLayout = () => {
  const { isLoading, data } = useClientOrderDetailQuery()

  if (!data && !isLoading) return <BadRequest hasHomeLink={false} />

  return (
    <>
      <MyHead title={AppTitle.ADMIN_ORDER_DETAIL} />
      <ClientPageContainer maxW={'container.lg'}>
        <Stack spacing={5}>
          <SimpleGrid spacing={{ md: 5 }} columns={24}>
            <GridItem colSpan={{ base: 24, md: 12, lg: 12 }}>
              <OrderDetailsCard />
            </GridItem>
            <GridItem colSpan={{ base: 24, md: 12, lg: 12 }}>
              <CustomerDetailsCard />
            </GridItem>
          </SimpleGrid>

          <Card>
            <OrderCourses isLoading={isLoading} data={data?.coursesInOrder} totalPrice={data?.totalPrice} />
          </Card>
        </Stack>
      </ClientPageContainer>
    </>
  )
}

Page.getLayout = ClientLayout
export default Page
