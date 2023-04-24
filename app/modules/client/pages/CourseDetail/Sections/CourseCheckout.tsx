import { BoxProps, Heading, HStack, Icon, Stack, Text, StatArrow, Stat, StatHelpText } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AppIcon from 'app/utils/constants/app-icon.constant'
import DateHelper from 'app/utils/helpers/date.helper'
import CourseHelper from 'app/utils/helpers/model-helpers/course.helper'
import Price from 'app/modules/shared/components/Price'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import AddToCartButton from 'app/modules/client/components/AddToCartButton'
import AddToFavoriteButton from 'app/modules/client/components/AddToFavoriteButton'
import { flatten } from 'lodash'

const TimeLeft = ({ time }: { time: string }) => {
  const text = useMemo(() => {
    return DateHelper.getTimeDiffStringFromNow(new Date(time))
  }, [time])
  if (!text) return <></>
  return (
    <HStack color="red.500">
      <Icon as={AppIcon.clock} />
      <Text>{text} left at this price!</Text>
    </HStack>
  )
}

export interface CourseCheckoutProps extends BoxProps {
  course: ICourse
  size?: 'sm' | 'md'
}

export default function CourseCheckout({ size = 'md', course, ...props }: CourseCheckoutProps) {
  const prices = useMemo(() => {
    return CourseHelper.getPrices(course.basicInfo.price, course.basicInfo.currency, course.promotions)
  }, [course])

  const lessonCount = useMemo(() => {
    return course.details.sections?.length
  }, [course])

  const lectureCount = useMemo(() => {
    return flatten(course.details.sections?.map((s) => s.units?.filter((u) => u.type == 'lecture'))).length
  }, [course])

  const quizCount = useMemo(() => {
    return flatten(course.details.sections?.map((s) => s.units?.filter((u) => u.type == 'quiz'))).length
  }, [course])

  const courseInfo = [
    {
      icon: AppIcon.lesson,
      title: 'Lessons',
      value: lessonCount,
    },
    {
      icon: AppIcon.lecture,
      title: 'Lectures',
      value: lectureCount,
    },
    {
      icon: AppIcon.quiz,
      title: 'Quizzes',
      value: quizCount,
    },
  ]

  return (
    <Stack spacing={3} {...props}>
      <Stack spacing={0}>
        <Stack alignItems={'center'} spacing={0}>
          <Heading as="h3" fontSize={'1.6rem'} color={'gray.700'} mb={2}>
            <Price value={prices?.sellPrice} currency={course.basicInfo.currency} />
          </Heading>
          <Stack>
            {prices?.discountPercent > 0 && (
              <Text as="del" color="gray.500">
                <Price value={prices?.originPrice} currency={course.basicInfo.currency} />
              </Text>
            )}
            {prices?.discountPercent > 0 && (
              <>
                <Stat>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    {Math.floor(prices?.discountPercent * 100)}% off
                  </StatHelpText>
                </Stat>
              </>
            )}
          </Stack>
          {prices?.discountPercent && <TimeLeft time={course.promotions.endAt!} />}
        </Stack>
      </Stack>
      <Stack>
        <HStack flexDir="row" marginBottom={2} justify="space-between" spacing={4} mt={2}>
          <AddToCartButton course={course} flex={1} />
          <AddToFavoriteButton item={course} />
        </HStack>
      </Stack>
      <Stack>
        <Heading as="h4" fontSize={'18px'} mt={3} mb={2}>
          Course Includes
        </Heading>
        <Stack spacing={3}>
          {courseInfo.map((info, index) => (
            <HStack key={index}>
              <Icon as={info.icon} fontSize={'18px'} />
              <Text fontSize={'15px'}>
                {info.value} {info.title}
              </Text>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
