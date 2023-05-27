import Time from '@admin/components/Time'
import {
  Box,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import BriefCourse from '@client/components/CourseGroup/BriefCourse'
import CoursePrice from '@client/components/CourseGroup/CoursePrice'
import Rating from '@client/components/Rating'
import { useIsClientMobile } from '@client/hooks/is-client-mobile.hook'
import CourseImage from '@shared/components/CourseImage'
import NextLink from '@shared/components/NextLink'
import { useObserveElementWidth } from '@shared/hooks/observe-resize-element'
import { useSubtitleColor } from '@shared/hooks/style.hook'
import ICourse from '@shared/interfaces/models/course.interface'
import Helper from 'app/utils/helpers/helper.helper'
import PathHelper from 'app/utils/helpers/path.helper'
import TypeHelper from 'app/utils/helpers/type.helper'
import React from 'react'

export const CourseExcerptMeta = ({ course }: { course: ICourse }) => {
  const subColor = useSubtitleColor()
  const hour = course.meta.contentVideoLength ? Math.round(course.meta.contentVideoLength / 60 / 60) : 0
  return (
    <HStack mb={'0.4rem'} spacing={1} color={subColor}>
      <Text fontSize={'xs'}>{hour} total hours •</Text>
      <Text fontSize={'xs'}>{Helper.capitalizeFirstLetter(course.basicInfo?.level as string) || 'All Levels'}</Text>
    </HStack>
  )
}

function FilteredCourseExcerpt({ course }: { course: ICourse }) {
  const isMobile = useIsClientMobile()
  const subColor = useSubtitleColor()
  const showOriginPrice = useBreakpointValue([false, false, true])
  const author = TypeHelper.isUser(course.history.createdBy) ? course.history.createdBy : undefined
  const { width: widthCourseWrp, ref: refCourseWrp } = useObserveElementWidth<HTMLDivElement>()

  return (
    <Popover placement="right" offset={[0, -widthCourseWrp / 2]} boundary={'scrollParent'} trigger="hover">
      <NextLink href={PathHelper.getCourseDetailPath(course.basicInfo.slug)}>
        <PopoverTrigger>
          <HStack align="start" ref={refCourseWrp}>
            <CourseImage
              src={course.basicInfo.image || ''}
              w={{ base: '100px', sm: '150px', md: '250px' }}
              borderRadius={'lg'}
              overflow={'hidden'}
            />
            <Stack flex={1} spacing={0} pl={{ md: 4 }}>
              {/* TITLE & SUBTITLE */}
              <Box>
                <Heading noOfLines={2} fontSize={'sm'}>
                  {' '}
                  {course.basicInfo.title}{' '}
                </Heading>
                <Text noOfLines={2} fontSize="sm" display={{ base: 'none', md: 'unset' }}>
                  {course.basicInfo.subtitle}
                </Text>
              </Box>
              {/* CREATED BY */}
              <Text fontSize={'xs'} color={subColor}>
                {author?.profile.fullName}
              </Text>
              {/* META */}
              <Stack spacing={0}>
                <Stack spacing={0}>
                  <Rating size="sm" ratingCount={course.meta.ratingCount} value={course.meta.avgRatingScore || 0} />
                  <CourseExcerptMeta course={course} />
                  <Text as="div" color={subColor} fontSize={'xs'} display={['none', 'unset']}>
                    <Time showIcon={false} type="short" timestamp={course.history.createdAt} />
                  </Text>
                </Stack>
                <Box display={{ base: 'block', md: 'none' }}>
                  <CoursePrice
                    currency={course.basicInfo.currency!}
                    originPrice={course.basicInfo.price || 0}
                    promotions={course.promotions}
                  />
                </Box>
              </Stack>
            </Stack>
            <Box
              display={{ base: 'none', md: 'flex' }}
              alignSelf={'start'}
              justifyContent={'flex-end'}
              fontSize={'lg'}
              ml={2}
              minWidth={'100px'}
            >
              <CoursePrice
                currency={course.basicInfo.currency!}
                originPrice={course.basicInfo.price || 0}
                promotions={course.promotions}
                showOriginPrice={showOriginPrice}
              />
            </Box>
          </HStack>
        </PopoverTrigger>
      </NextLink>

      {!isMobile ? (
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody shadow="md" p={5}>
              <BriefCourse course={course} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      ) : null}
    </Popover>
  )
}
export default React.memo(FilteredCourseExcerpt)
