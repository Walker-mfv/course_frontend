import Pagination from '@shared/components/Pagination/Pagination'
import React from 'react'
import { useAdminPagination } from '../providers/admin-pagination-provider'

export default function AdminPagination() {
  const pagination = useAdminPagination()
  return (
    <>
      {pagination.totalPage && pagination.totalPage > 1 && (
        <Pagination colorScheme={'purple'} pagination={pagination} />
      )}
    </>
  )
}
