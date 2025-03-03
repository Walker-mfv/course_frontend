import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react'
import Helper from 'app/utils/helpers/helper.helper'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useAdminParams } from '../providers/admin-params.provider'

export default function AdminBreadcrumb() {
  const { subPaths } = useAdminParams()
  const breadCrumbItemsHtml = subPaths.map((item) => {
    const title = Helper.lodash.capitalize(item)
    return (
      <BreadcrumbItem key={item}>
        <BreadcrumbLink>{title}</BreadcrumbLink>
      </BreadcrumbItem>
    )
  })
  return (
    <Breadcrumb spacing="8px" separator={<Icon as={FiChevronRight} color="gray.500" />}>
      {breadCrumbItemsHtml}
    </Breadcrumb>
  )
}
