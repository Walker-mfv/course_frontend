import { Box, HStack, LightMode, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CourseImage from 'app/modules/shared/components/CourseImage'
import { useShowPreviewCourse } from 'app/modules/client/hooks/show-preview-course.hook'
import { useCourseDetailQuery } from 'app/modules/client/queries/course-detail-query.hook'
import CourseCheckout from './CourseCheckout'

const CoursePreview = () => {
  const [isTop, setTop] = useState(true)
  const { data: course } = useCourseDetailQuery()
  const bgColor = useColorModeValue('white', 'blackAlpha.500')
  const show = useShowPreviewCourse()

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY < 90)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!show) return <></>
  if (!course) return <></>

  return (
    <LightMode>
      <Stack
        w="340px"
        pos="fixed"
        minH={'500px'}
        transitionProperty={'top'}
        transitionDuration={'normal'}
        top={isTop ? { base: '100px', '2xl': '150px' } : '50px'}
        right={{ base: '100px', '2xl': '200px' }}
        overflowY="auto"
        flexDir="column"
        display={{ base: 'none', xl: 'flex' }}
        shadow={'0 32px 54px 0 rgba(0,0,0,.1)'}
        bgColor={bgColor}
        borderRadius={'lg'}
        pb={7}
      >
        <HStack justify={'center'} bg="blackAlpha.900">
          <CourseImage w="full" src={course.basicInfo.image || ''} />
        </HStack>
        <Box px={7} pt={2}>
          <CourseCheckout course={course} size="sm" />
        </Box>
      </Stack>
    </LightMode>
  )
}

export default React.memo(CoursePreview)
