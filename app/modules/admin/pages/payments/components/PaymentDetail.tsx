import { Stack } from '@chakra-ui/react'
import React from 'react'
import TransactionTable from 'app/modules/instructor/pages/performance/RevenueReportPage/TransactionTable'
import {
  useCountPaymentTransactionsQuery,
  usePaymentTransactionsQuery,
} from 'app/modules/instructor/queries/payment-transactions-query.hook'
import SimplePaginationButtons from 'app/modules/shared/components/button-set/SimplePaginationButtons'
import { SimplePaginationProvider, useSimplePagination } from 'app/modules/shared/providers/simple-pagination.provider'

const ROWS_PER_PAGE = 5
const Main = (props: PaymentDetailProps) => {
  const {
    state: { page },
  } = useSimplePagination()
  const { isLoading: isTransactionsLoading, data: transactionsData } = usePaymentTransactionsQuery(
    page,
    ROWS_PER_PAGE,
    props.paymentId
  )
  return (
    <Stack>
      <TransactionTable isLoading={isTransactionsLoading} data={transactionsData} />
      <SimplePaginationButtons />
    </Stack>
  )
}

export interface PaymentDetailProps {
  paymentId?: string
}
export default function PaymentDetail(props: PaymentDetailProps) {
  const { data: totalItem } = useCountPaymentTransactionsQuery(props.paymentId)
  return (
    <SimplePaginationProvider totalItem={totalItem} rowsPerPage={ROWS_PER_PAGE}>
      <Main {...props} />
    </SimplePaginationProvider>
  )
}
