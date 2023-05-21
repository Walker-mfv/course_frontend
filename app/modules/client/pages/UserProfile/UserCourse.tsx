import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import AddToFavoriteButton from '@client/components/AddToFavoriteButton'
import CoursePrice from '@client/components/CourseGroup/CoursePrice'
import Rating from '@client/components/Rating'
import NextLink from '@shared/components/NextLink'
import AppIcon from 'app/utils/constants/app-icon.constant'
import PathHelper from 'app/utils/helpers/path.helper'

const UserCourse = ({ courses }: { courses: any }) => {
  const bgColor = useColorModeValue('unset', 'gray.700')

  return (
    <Stack spacing={6}>
      <Text fontWeight={600} fontSize={'2xl'}>
        My courses ({courses.length})
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={[2, 4, 5]}>
        {courses.map((course: any) => (
          <Box
            bgColor={bgColor}
            shadow="lg"
            pos="relative"
            height="full"
            key={course._id}
            borderRadius={'lg'}
            overflow={'hidden'}
          >
            <NextLink href={PathHelper.getCourseDetailPath(course.basicInfo.slug)}>
              <Stack shadow={'lg'} height="full" overflow={'hidden'}>
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
                    <Image src={course.basicInfo.image || ''} alt={course.basicInfo.title} w="full" />
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
                      {course.basicInfo.title}
                    </Heading>
                  </Stack>
                  <Box display={'flex'} alignItems={'end'} flex={1}>
                    <HStack justify={'space-between'} w={'full'}>
                      <Stack spacing={0}>
                        <Rating value={course.meta.avgRatingScore || 0} ratingCount={course.meta.ratingCount} />
                        <CoursePrice
                          currency={course.basicInfo.currency!}
                          originPrice={course.basicInfo.price || 0}
                          promotions={course.promotions?.enabled ? course.promotions : undefined}
                        ></CoursePrice>
                      </Stack>
                      <AddToFavoriteButton size="sm" item={course} />
                    </HStack>
                  </Box>
                </Stack>
              </Stack>
            </NextLink>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default UserCourse
