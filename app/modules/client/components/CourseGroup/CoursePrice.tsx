import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import CourseHelper from 'app/utils/helpers/model-helpers/course.helper'
import Price from 'app/modules/shared/components/Price'
import { useDarkBg, useSubtitleColor } from 'app/modules/shared/hooks/style.hook'
import { ICoursePromotions, TCourseCurrency } from 'app/modules/shared/interfaces/models/course.interface'

export interface CoursePriceProps {
  currency: TCourseCurrency
  originPrice: number
  promotions?: ICoursePromotions
  showOriginPrice?: boolean
}

function CoursePrice({ showOriginPrice = true, originPrice, promotions, currency }: CoursePriceProps) {
  const subColor = useSubtitleColor()
  const prices = CourseHelper.getPrices(originPrice, currency, promotions)
  const priceColor = useDarkBg()
  return (
    <HStack>
      <Text fontWeight={'bold'} color={priceColor}>
        <Price value={prices.sellPrice} currency={currency} />
      </Text>
      {prices.sellPrice != prices.originPrice && showOriginPrice && (
        <Text as="del" fontSize={'xs'} color={subColor}>
          <Price value={prices.originPrice} currency={currency} />
        </Text>
      )}
    </HStack>
  )
}

export default React.memo(CoursePrice)
