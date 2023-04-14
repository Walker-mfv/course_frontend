import {
  AspectRatio,
  Heading,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import PathHelper from '../../../../utils/helpers/path.helper'
import TypeHelper from '../../../../utils/helpers/type.helper'
import NextLink from '../../../shared/components/NextLink'
import { useSubtitleColor } from '../../../shared/hooks/style.hook'
import ICourse from '../../../shared/interfaces/models/course.interface'
import { useIsClientMobile } from '../../hooks/is-client-mobile.hook'
import Rating from '../Rating'
import BriefCourse from './BriefCourse'
import CoursePrice from './CoursePrice'

export interface HomeCourseExcerptProps {
  course: ICourse
}

function HomeCourseExcerpt({ course }: HomeCourseExcerptProps) {
  console.log(course.basicInfo)

  const subColor = useSubtitleColor()
  const isMobile = useIsClientMobile()
  const author = TypeHelper.isUser(course.history.createdBy) ? course.history.createdBy : undefined
  return (
    <>
      <Popover placement="right" boundary={'scrollParent'} trigger="hover">
        <NextLink href={PathHelper.getCourseDetailPath(course.basicInfo.slug)}>
          <PopoverTrigger>
            <Stack bg="white" borderRadius={'lg'} border={'1px solid #e0dfdb'} height={'full'}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={course.basicInfo.image || ''}
                  alt={course.basicInfo.title}
                  borderTopLeftRadius={'lg'}
                  borderTopRightRadius={'lg'}
                />
              </AspectRatio>
              <Stack spacing={0} p={'10px 15px 15px'} height={'full'} justifyContent={'space-between'}>
                <Stack spacing={0} mb={'3'}>
                  <Heading fontSize={{ base: 'sm', md: 'md' }} noOfLines={2}>
                    {course.basicInfo.title}
                  </Heading>
                </Stack>
                <Stack spacing={0.5}>
                  <Stack spacing={0} direction={'row'} alignItems={'center'} mb={'2'}>
                    <Image
                      src={author?.profile.avatar || ''}
                      alt={course.basicInfo.title}
                      borderRadius={'50%'}
                      maxWidth={'28px'}
                      mr={'2.5'}
                    />
                    <Text fontSize={['xs', 'sm']} color={subColor}>
                      {author?.profile.fullName}
                    </Text>
                  </Stack>
                  <CoursePrice
                    currency={course.basicInfo.currency!}
                    originPrice={course.basicInfo.price || 0}
                    promotions={course.promotions?.enabled ? course.promotions : undefined}
                  ></CoursePrice>
                  <Rating value={course.meta.avgRatingScore || 0} ratingCount={course.meta.ratingCount} size="sm" />
                </Stack>
              </Stack>
            </Stack>
          </PopoverTrigger>
        </NextLink>
        {!isMobile ? (
          <Portal>
            <PopoverContent width={'21rem'} borderRadius={'lg'}>
              <PopoverArrow />
              <PopoverBody shadow="md" p={6}>
                <BriefCourse course={course} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        ) : null}
      </Popover>
    </>
  )
}

export default React.memo(HomeCourseExcerpt)
