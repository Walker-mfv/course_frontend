import { ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalCourse } from 'app/store/course/cart.slice'
import AppIcon from 'app/utils/constants/app-icon.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import NextLink from '@shared/components/NextLink'
import IconButtonWithNumber from './IconButtonWithNumber'

export interface CartButtonProps extends ButtonProps {}
export default function CartButton(props: CartButtonProps) {
  const totalCourse = useSelector(selectTotalCourse)
  return (
    <NextLink href={PathHelper.getCartPath()}>
      <IconButtonWithNumber px={2} icon={AppIcon.cart} number={totalCourse} {...props} />
    </NextLink>
  )
}
