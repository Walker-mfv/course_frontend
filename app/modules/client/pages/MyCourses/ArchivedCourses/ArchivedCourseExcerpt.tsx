import { AspectRatio, Box, Button, Heading, HStack, Icon, Image, Progress, Stack, Text, VStack } from '@chakra-ui/react'
import { MyMenu } from '@shared/components/MyMenu'
import NextLink from '@shared/components/NextLink'
import { IMenuItem } from '@shared/interfaces/menu-item.interface'
import { IUserCourse } from '@shared/interfaces/models/user_course.interface'
import AppIcon from 'app/utils/constants/app-icon.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import React from 'react'
import MyCourseCard from '../MyCourseCard'

export interface ArchivedCourseExcerptProps {
  item: IUserCourse
  actions?: IMenuItem<IUserCourse>[]
}
function ArchivedCourseExcerpt({ item, actions }: ArchivedCourseExcerptProps) {
  const percent = Math.floor(item.learnDetail.progress * 100)
  return (
    <MyCourseCard borderRadius={'lg'} overflow={'hidden'}>
      <NextLink href={PathHelper.getLearnCoursePath(item.course.basicInfo.slug)}>
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
              <Image src={item.course.basicInfo.image || ''} alt={item.course.basicInfo.title} w="full" />
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
              <Heading fontSize={'md'}>{item.course.basicInfo.title}</Heading>
            </Stack>
            {/* PROGRESS */}
            <Stack spacing={0} flex={1} justify="end">
              <Stack>
                <Progress value={percent} size="xs" colorScheme="pink" />
                <HStack justify={'space-between'}>
                  <Text fontSize={'xs'}>{percent}% Complete</Text>
                  <Button variant="link" size="xs">
                    Leave a Rating
                  </Button>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </NextLink>
      {/* ACTIONS */}
      {actions && (
        <Box pos="absolute" top={4} right={4} zIndex={1}>
          <MyMenu item={item} actions={actions} />
        </Box>
      )}
    </MyCourseCard>
  )
}

export default React.memo(ArchivedCourseExcerpt)
