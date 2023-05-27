import { AdminPaginationProvider } from '@admin/providers/admin-pagination-provider'
import { AdminUrlParamsProvider } from '@admin/providers/admin-query.provider'
import PageParamsProvider from '@admin/providers/page-params.provider'
import { Stack } from '@chakra-ui/react'
import ClientLayout from '@client/ClientLayout'
import ClientPageContainer from '@client/components/ClientPageContainer'
import ClientPageHeading from '@client/components/ClientPageHeading'
import { useUserTableRows } from '@client/queries/client-order-query.hook'
import AdminTable from 'app/modules/admin/components/AdminTable/AdminTable'
import RowActions from 'app/modules/admin/components/RowAction'
import Time from 'app/modules/admin/components/Time'
import SearchProvider from 'app/modules/admin/providers/search.provider'
import Card from 'app/modules/shared/components/Card'
import MyHead from 'app/modules/shared/components/MyHead'
import Price from 'app/modules/shared/components/Price'
import IOrder from 'app/modules/shared/interfaces/models/order.interface'
import { ITableColumn } from 'app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from 'app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from 'app/utils/constants/app.constant'
import FieldLabel from 'app/utils/constants/field-label.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import React, { useMemo } from 'react'

// DATA
export const columns: ITableColumn[] = [
  {
    header: 'Order Id',
    accessor: '_id',
    sortable: false,
  },
  {
    header: 'Total',
    accessor: 'totalPrice',
    sortable: true,
  },
  {
    header: FieldLabel['course.createdAt'],
    accessor: 'history.createdAt',
    sortable: true,
  },
  {
    header: FieldLabel.actions,
    accessor: 'actions',
  },
]

// PAGE CONTENT
const PageContent = () => {
  return (
    <Stack flexDir="column" spacing={8}>
      {/* MAIN TABLE*/}
      <Card>
        <Stack spacing={8} flexDir="column" alignItems={'stretch'}>
          <ClientPageHeading>My orders</ClientPageHeading>
          <PageTable />
        </Stack>
      </Card>
    </Stack>
  )
}

const PageTable = () => {
  // const { ctrlName } = usePageParams()
  const rowsQ = useUserTableRows()

  const rows: ITableRow[] | undefined = useMemo(() => {
    return rowsQ.data?.map((item: Omit<IOrder, 'moneyConfiguration'>) => {
      return {
        _id: item._id,
        totalPrice: <Price value={item.totalPrice} />,
        'history.createdAt': <Time timestamp={item.history.createdAt} />,
        actions: (
          <RowActions
            actions={[
              {
                name: 'View Detail',
                path: PathHelper.getMyOrderDetailPath(item._id),
              },
            ]}
          />
        ),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsQ.data])
  return (
    <AdminTable
      hasMultiChange={false}
      isLoading={rowsQ.isLoading}
      isError={rowsQ.isError}
      columns={columns}
      rows={rows}
    />
  )
}

// PROVIDERS AND DEFAULT VALUES
const Index: NextPageWithLayout = (query: any) => {
  return (
    <>
      <MyHead title={AppTitle.MY_ORDERS} />
      <ClientPageContainer maxW={'container.lg'}>
        <PageParamsProvider
          defaultValue={{
            ctrlName: CONTROLLER['my-orders'],
            modelName: MODEL['my-orders'],
          }}
        >
          <AdminUrlParamsProvider
            defaultValue={{
              _sortBy: 'history.createdAt',
              _order: 'desc',
              _limit: 5,
              ...query,
            }}
          >
            <AdminPaginationProvider
              params={{
                itemsPerPage: 5,
                pageRange: 3,
                totalItems: 0,
              }}
            >
              <SearchProvider defaultField={'all'}>
                <PageContent />
              </SearchProvider>
            </AdminPaginationProvider>
          </AdminUrlParamsProvider>
        </PageParamsProvider>
      </ClientPageContainer>
    </>
  )
}

Index.getLayout = ClientLayout
export default Index
