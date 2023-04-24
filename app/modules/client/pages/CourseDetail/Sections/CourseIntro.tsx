import { AspectRatio, Box, Container, Heading, HStack, Stack, Text, useColorModeValue, Image } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import NumberFormat from 'react-number-format'
import CourseImage from 'app/modules/shared/components/CourseImage'
import Rating from '@client/components/Rating'
import { useShowPreviewCourse } from '@client/hooks/show-preview-course.hook'
import { useCourseDetailQuery } from '@client/queries/course-detail-query.hook'
import CourseCheckout from './CourseCheckout'

const Meta = () => {
  const course = useCourseDetailQuery().data
  const show = useShowPreviewCourse()
  return (
    <Stack
      color={show ? 'whitesmoke' : 'unset'}
      fontSize={'14px'}
      flexDir={{
        base: 'column',
        sm: 'row',
      }}
      spacing={{
        sm: 0,
      }}
      gap={{
        sm: 4,
      }}
      alignItems={'baseline'}
    >
      <Rating value={course?.meta.avgRatingScore} ratingCount={course?.meta.ratingCount} size={'sm'} />
      <Box>
        <Text>
          (
          <NumberFormat displayType="text" thousandSeparator value={course?.meta.ratingCount} />
          &nbsp;ratings)
        </Text>
      </Box>
      <Box>
        <Text>
          <NumberFormat
            value={course?.meta.studentCount}
            displayType="text"
            thousandSeparator
            // style={{ fontSize: '16px' }}
          />
          &nbsp;students
        </Text>
      </Box>
    </Stack>
  )
}

const History = () => {
  const course = useCourseDetailQuery().data
  const show = useShowPreviewCourse()
  return (
    <Stack fontSize={'14px'} spacing={2}>
      <HStack>
        <Text color={show ? 'white' : 'unset'}>Create by</Text>
        <Text color="purple.400" as="ins">
          {course?.history.createdBy.profile.fullName}
        </Text>
      </HStack>
      <HStack>
        <HStack>
          {course?.history.publishedAt && (
            <Text color={show ? 'white' : 'unset'}>
              Last updated {moment(new Date(course.history.publishedAt)).format('MM/YYYY')}
            </Text>
          )}
        </HStack>
      </HStack>
    </Stack>
  )
}

const CourseIntro = () => {
  const { data: course } = useCourseDetailQuery()
  const showPreviewCourse = useShowPreviewCourse()
  const bg = useColorModeValue('rgba(0, 0, 0, 0.55);', 'blackAlpha.500')
  if (!course) return <></>
  return (
    <Stack spacing={2} bg={showPreviewCourse ? bg : 'unset'} pos={'relative'} overflow={'hidden'}>
      <AspectRatio
        display={showPreviewCourse ? 'block' : 'none'}
        width={'full'}
        ratio={21 / 7}
        pos={'absolute'}
        top={0}
        left={0}
        zIndex="-1"
      >
        {course?.basicInfo.image ? <Image src={course?.basicInfo.image} alt={'course image'} /> : <Box></Box>}
      </AspectRatio>
      <Container maxW="container.lg" margin={'auto!important'} pos={'relative'} pt={{ base: 0, '2xl': 6 }} pb={6}>
        <Box maxW="700px" margin={showPreviewCourse ? 'unset' : 'auto'} pt={{ base: '2rem', xl: '4rem' }} pb={'2.5rem'}>
          <Stack spacing={{ base: 6, '2xl': 10 }} py={4}>
            <Box display={showPreviewCourse ? 'none' : 'block'} borderRadius={6}>
              <CourseImage src={course?.basicInfo.image || ''} w="full" />
            </Box>
            {/* TITLE AND SUBTITLE */}
            <Box>
              <Heading fontSize={['xl', '2xl', '48px']} color={showPreviewCourse ? 'white' : 'unset'} mb={7} size="lg">
                {course?.basicInfo.title}{' '}
              </Heading>
              <Text color={showPreviewCourse ? 'white' : 'unset'} fontSize="md">
                {course?.basicInfo.subtitle}
              </Text>
            </Box>

            <Stack
              spacing={2}
              flexDir={{
                base: 'row',
                sm: 'column',
              }}
              justify={{
                base: 'start',
                sm: 'unset',
              }}
              gap={{ base: 10, sm: 0 }}
            >
              {/* META */}
              <Meta />

              {/* HISTORY */}
              <History />
            </Stack>
            {!showPreviewCourse ? <CourseCheckout course={course} /> : null}
          </Stack>
        </Box>
      </Container>
    </Stack>
  )
}

export default React.memo(CourseIntro)
