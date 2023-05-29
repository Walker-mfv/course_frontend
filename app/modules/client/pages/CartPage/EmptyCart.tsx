import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import NextLink from '@shared/components/NextLink'
import { useBorderColor, useCardBg } from '@shared/hooks/style.hook'
import AppImg from 'app/utils/constants/app-img.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import React from 'react'

export default function EmptyCart() {
  const borderColor = useBorderColor()
  const bg = useCardBg()

  return (
    <Box p={5} border="1px solid" borderColor={borderColor} borderRadius={'lg'} backgroundColor={bg} boxShadow={'md'}>
      <VStack>
        <Image borderRadius={'md'} maxW={'250px'} alt="Cart image" src={AppImg.EMPTY_SHOPPING_CART} />
        <VStack pb={10}>
          <Text>Your cart is empty. Keep shopping to find a course!</Text>
          <NextLink href={PathHelper.getClientPath()}>
            <Button colorScheme={'purple'}>Keep shopping</Button>
          </NextLink>
        </VStack>
      </VStack>
    </Box>
  )
}
