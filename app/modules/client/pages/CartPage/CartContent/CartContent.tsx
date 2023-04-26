import { GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import CartCheckoutInfo from './CartCheckoutInfo'
import CartCourseList from './CartCourseList'

export default function CartContent() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <CartCourseList />
      </GridItem>
      <GridItem colSpan={1}>
        <CartCheckoutInfo />
      </GridItem>
    </SimpleGrid>
  )
}
