import React from 'react'
import StarRatings from 'react-star-ratings'

export interface RatingStarProps {
  value: number
  w?: any
}
function RatingStar({ w = '16px', value }: RatingStarProps) {
  return (
    <StarRatings
      rating={value}
      starDimension={w}
      starSpacing="0px"
      starRatedColor="var(--chakra-colors-rating-500)"
      starEmptyColor="var(--chakra-colors-gray-400)"
    />
  )
}

export default React.memo(RatingStar)
