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
import NextLink from 'app/modules/shared/components/NextLink'
import { useBorderColor, useCardBg, useSubtitleColor } from 'app/modules/shared/hooks/style.hook'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import AppImg from 'app/utils/constants/app-img.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import TypeHelper from 'app/utils/helpers/type.helper'
import React from 'react'
import { useIsClientMobile } from '../../hooks/is-client-mobile.hook'
import Rating from '../Rating'
import BriefCourse from './BriefCourse'
import CoursePrice from './CoursePrice'

export interface HomeCourseExcerptProps {
  course: ICourse
}

function HomeCourseExcerpt({ course }: HomeCourseExcerptProps) {
  const borderColor = useBorderColor()
  const subColor = useSubtitleColor()
  const isMobile = useIsClientMobile()
  const bgCard = useCardBg()
  const author = TypeHelper.isUser(course.history.createdBy) ? course.history.createdBy : undefined

  return (
    <>
      <Popover placement="right" boundary={'scrollParent'} trigger="hover">
        <NextLink href={PathHelper.getCourseDetailPath(course.basicInfo.slug)}>
          <PopoverTrigger>
            <Stack
              bg={bgCard}
              borderRadius={'lg'}
              border={'1px solid'}
              borderColor={borderColor}
              height={'full'}
              boxShadow={'md'}
            >
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
                    <AspectRatio
                      ratio={1 / 1}
                      w={'28px'}
                      mr={'2.5'}
                      background={'gray.400'}
                      borderRadius={'50%'}
                      overflow={'hidden'}
                    >
                      <Image
                        src={author?.profile.avatar || AppImg.MEDIA_PLACEHOLDER}
                        alt={course.basicInfo.title}
                        borderRadius={'50%'}
                      />
                    </AspectRatio>
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
              <PopoverBody shadow="md" p={6} borderRadius={'lg'}>
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
