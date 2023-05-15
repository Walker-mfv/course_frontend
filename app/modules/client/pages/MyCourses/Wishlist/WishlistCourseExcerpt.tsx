import { AspectRatio, Box, Heading, HStack, Icon, Image, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import PathHelper from 'app/utils/helpers/path.helper'
import NextLink from '@shared/components/NextLink'
import ICourse from '@shared/interfaces/models/course.interface'
import AddToFavoriteButton from '@client/components/AddToFavoriteButton'
import CoursePrice from '@client/components/CourseGroup/CoursePrice'
import Rating from '@client/components/Rating'
import MyCourseCard from '../MyCourseCard'
import AppIcon from 'app/utils/constants/app-icon.constant'

export interface WishlistCourseExcerptProps {
  item: ICourse
}
function WishlistCourseExcerpt({ item }: WishlistCourseExcerptProps) {
  return (
    <MyCourseCard>
      <NextLink href={PathHelper.getLearnCoursePath(item.basicInfo.slug)}>
        <Stack shadow={'lg'} height="full" borderRadius={'lg'} overflow={'hidden'}>
          {/* IMAGE */}
          <AspectRatio ratio={16 / 9} pos="relative">
            <Box
              sx={{
                '&:hover': {
                  '.overlay': {
                    display: 'block',
                  },
                },
              }}
            >
              <Image src={item.basicInfo.image || ''} alt={item.basicInfo.title} w="full" />
              <Box
                display={'none'}
                className="overlay"
                pos="absolute"
                left={0}
                right={0}
                top={0}
                bottom={0}
                bgColor="rgba(0, 0, 0,.5)"
              >
                <VStack justify={'center'} h="100%">
                  <Icon fontSize={'70px'} as={AppIcon.play} color="whitesmoke" />
                </VStack>
              </Box>
            </Box>
          </AspectRatio>
          {/* INFO */}
          <Stack pt={2} px={[2, 4]} pb={[2, 4]} flex={1}>
            {/* TITLE */}
            <Stack mb={1}>
              <Heading fontSize={'md'} noOfLines={3} lineHeight={'1.4'}>
                {item.basicInfo.title}
              </Heading>
            </Stack>
            <Box display={'flex'} alignItems={'end'} flex={1}>
              <HStack justify={'space-between'}>
                <Stack spacing={0}>
                  <Rating value={item.meta.avgRatingScore || 0} ratingCount={item.meta.ratingCount} />
                  <CoursePrice
                    currency={item.basicInfo.currency!}
                    originPrice={item.basicInfo.price || 0}
                    promotions={item.promotions?.enabled ? item.promotions : undefined}
                  ></CoursePrice>
                </Stack>
                <AddToFavoriteButton size="sm" item={item} />
              </HStack>
            </Box>
          </Stack>
        </Stack>
      </NextLink>
    </MyCourseCard>
  )
}

export default React.memo(WishlistCourseExcerpt)
