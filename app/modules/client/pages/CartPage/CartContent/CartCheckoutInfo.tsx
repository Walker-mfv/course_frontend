import { Text, Heading, Stack, HStack, StackDivider, space, Box, Stat, StatHelpText, StatArrow } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalOriginPrice, selectTotalSellPrice } from 'app/store/course/cart.slice'
import Price from '@shared/components/Price'
import { CheckoutButton } from './CheckoutButton'
import { useBorderColor } from '@shared/hooks/style.hook'

function CartCheckoutInfo() {
  const borderColor = useBorderColor()
  const totalPrice = useSelector(selectTotalOriginPrice)
  const sellPrice = useSelector(selectTotalSellPrice)
  const percent = Math.floor(((totalPrice - sellPrice) / totalPrice) * 100)
  return (
    <Stack
      spacing={5}
      border="1px solid"
      borderColor={borderColor}
      borderRadius={'lg'}
      p={6}
      pt={4}
      divider={<StackDivider color={borderColor} />}
    >
      <Stack spacing={2}>
        <HStack w={'full'} justify={'space-between'}>
          <Text>Subtotal price:</Text>
          <Text fontWeight={'bold'}>
            <Price value={totalPrice} />
          </Text>
        </HStack>
        <HStack w={'full'} justify={'space-between'} align={'start'} spacing={0}>
          <Text>Discount:</Text>
          <Text fontWeight={'bold'}>
            <Price value={totalPrice - sellPrice} />
          </Text>
        </HStack>
      </Stack>
      <HStack w={'full'} justify={'space-between'} align={'start'}>
        <Text>Total price:</Text>
        <Stack fontWeight={'bold'} align={'end'}>
          <Price value={sellPrice} />
          {percent > 0 ? (
            <Stat color={'pink.500'}>
              <StatHelpText>
                <StatArrow color={'pink.500'} type="decrease" />
                {Math.floor(percent)}% off
              </StatHelpText>
            </Stat>
          ) : (
            <></>
          )}
        </Stack>
      </HStack>
      <CheckoutButton />
    </Stack>
  )
}

export default React.memo(CartCheckoutInfo)
