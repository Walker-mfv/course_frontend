import { HStack, Skeleton, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import Rating from '@client/components/Rating'
import { CourseExcerptMeta } from '@client/pages/SearchPage/FilteredCourseList/FilteredCourseExcerpt'
import CourseImage from 'app/modules/shared/components/CourseImage'
import NextLink from 'app/modules/shared/components/NextLink'
import Price from 'app/modules/shared/components/Price'
import { useMutedColor } from 'app/modules/shared/hooks/style.hook'
import { ICourseInOrder } from 'app/modules/shared/interfaces/models/order.interface'
import PathHelper from 'app/utils/helpers/path.helper'
import React, { useCallback } from 'react'

const Row = ({ item }: { item: ICourseInOrder }) => {
  const mutedColor = useMutedColor()
  return (
    <Tr>
      <Td whiteSpace={'pre-wrap'}>
        <HStack align={'start'} spacing={4}>
          <NextLink href={PathHelper.getCourseDetailPath(item.course.basicInfo.slug)}>
            <CourseImage
              w={['100px', '150px', '200px']}
              src={item.course.basicInfo.image || ''}
              defaultImage={false}
              borderRadius={'md'}
              overflow={'hidden'}
            />
          </NextLink>

          <Stack spacing={1}>
            <NextLink href={PathHelper.getCourseDetailPath(item.course.basicInfo.slug)}>
              <Stack display={{ base: 'none', md: 'flex' }} spacing={1}>
                <Text color={mutedColor} fontSize="sm">
                  {item.course.basicInfo.subtitle}
                </Text>
                <Rating value={item.course.meta.avgRatingScore} />
                <CourseExcerptMeta course={item.course} />
              </Stack>
            </NextLink>
          </Stack>
        </HStack>
      </Td>
      <Td>
        <Price value={item.price} />
      </Td>
      <Td fontWeight={'bold'}>
        <Price value={item.salePrice} />
      </Td>
    </Tr>
  )
}

export interface OrderCoursesProps {
  isLoading: boolean
  data?: ICourseInOrder[]
  totalPrice?: number
}
export default function OrderCourses(props: OrderCoursesProps) {
  const renderItem = useCallback((item: ICourseInOrder) => {
    return <Row key={item.course._id} item={item} />
  }, [])
  return (
    <Skeleton isLoaded={!props.isLoading}>
      <Text fontSize={'xl'} fontWeight={'bold'} mb={'2'}>
        Order Courses
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Original price</Th>
              <Th>Sale price</Th>
            </Tr>
          </Thead>
          <Tbody>{props.data?.map(renderItem)}</Tbody>
          <Tfoot>
            <Tr>
              <Td></Td>
              <Td>Total Price</Td>
              <Td fontWeight={'bold'}>
                <Price value={props.totalPrice} />
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Skeleton>
  )
}
