import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'
import ClientPageHeading from '@client/components/ClientPageHeading'
import { useClientUrlParams } from '@client/hooks/client-url-params.hook'
import { useCountFilterCoursesQuery } from '@client/queries/filter-courses-query.hook'

const SearchHeading = () => {
  const { _searchValue } = useClientUrlParams()
  const { isLoading, data } = useCountFilterCoursesQuery()
  return (
    <Stack spacing={4}>
      <Skeleton isLoaded={!isLoading} w="fit-content">
        <ClientPageHeading>
          {data} results for “{_searchValue}”
        </ClientPageHeading>
      </Skeleton>
    </Stack>
  )
}

export default SearchHeading
