import { Stack, StackDivider, useColorModeValue } from '@chakra-ui/react'
import { useBorderColor } from '@shared/hooks/style.hook'
import { selectCoursesInCart } from 'app/store/course/cart.slice'
import React from 'react'
import { useSelector } from 'react-redux'
import CartCourse from './CartCourse'

export default function CartCourseList() {
  const borderColor = useBorderColor()
  const courses = useSelector(selectCoursesInCart)
  const bg = useColorModeValue('white', 'transparent')
  const coursesHtml = courses.map((item, i) => {
    return <CartCourse key={item._id} course={item} />
  })
  return (
    <Stack
      divider={<StackDivider color={borderColor} />}
      border="1px solid"
      borderColor={borderColor}
      borderRadius={'lg'}
      spacing={4}
      p={4}
      backgroundColor={bg}
      boxShadow={'md'}
    >
      {coursesHtml}
    </Stack>
  )
}
