import {
  Box,
  BoxProps,
  Button,
  Heading,
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import CourseHelper from 'app/utils/helpers/model-helpers/course.helper'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import PathHelper from 'app/utils/helpers/path.helper'
import HighlightText from '@admin/components/HighlightText'
import StatusBadge from '@admin/components/StatusBadge'
import RatingStar from '@client/components/RatingStar'
import CourseImage from '@shared/components/CourseImage'
import NextLink from '@shared/components/NextLink'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import { useSubtitleColor } from '@shared/hooks/style.hook'
import ICourse from '@shared/interfaces/models/course.interface'
import { TSize } from '@shared/types/size.type'
import InstructorTableContainer from 'app/modules/instructor/components/InstructorTableContainer'
import { useInstructorCoursesUrlParams } from 'app/modules/instructor/hooks/instructor-courses-url-params.hook'
import IInstructorCourse from 'app/modules/instructor/interfaces/instructor-course.interface'
import {
  useConvertCourseToDraft,
  useConvertCourseToInactive,
  useInstructorCoursesQuery,
} from 'app/modules/instructor/queries/instructor-courses-query.hook'
import RowActions from '@admin/components/RowAction'
import Helper from 'app/utils/helpers/helper.helper'
import lan from 'app/utils/constants/lan.constant'
import { FiEdit2 } from 'react-icons/fi'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { useRouter } from 'next/router'
import { useSimpleDialog } from '@admin/providers/simple-dialog.provider'

interface OverlayBoxProps extends BoxProps {}
const OverlayBox = ({ children, ...props }: OverlayBoxProps) => {
  const bgColor = useColorModeValue('rgba(255,255,255,.9)', 'rgba(26,32,44,.9)')
  return (
    <Box
      bgColor={bgColor}
      className="overlay"
      pos="absolute"
      zIndex={0.5}
      display={'none'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      p={4}
      pl={8}
      {...props}
    >
      {children}
    </Box>
  )
}

const OverlayLink = ({
  title,
  href,
  fontSize = '2xl',
  textAlign = 'center',
}: {
  textAlign?: 'left' | 'center'
  fontSize?: TSize
  href: string
  title: string
}) => {
  return (
    <HStack w="full" h="full">
      <NextLink href={href} linkProps={{ flex: 1, height: '100%' }}>
        <Button
          textAlign={textAlign}
          variant="unstyled"
          fontWeight={'bold'}
          fontSize={fontSize}
          w="full"
          sx={{ height: '100%' }}
        >
          {title}
        </Button>
      </NextLink>
    </HStack>
  )
}

const HighlightSearchText = (props: { value: string }) => {
  const { _searchValue } = useInstructorCoursesUrlParams()
  return (
    <HighlightText
      fields={['basicInfo.title']}
      value={props.value}
      searchField="basicInfo.title"
      searchValue={_searchValue || ''}
    />
  )
}

const hoverShowOverlayStyle = {
  position: 'relative',
  '&:hover': {
    '.overlay': {
      display: 'block',
    },
  },
}

const TdContent = ({ item }: { item: ICourse }) => {
  return (
    <HStack align={'stretch'} spacing={4}>
      <CourseImage src={item.basicInfo.image || ''} defaultImage borderRadius={'md'} overflow={'hidden'} />
      <Stack flex={1} justify={'center'}>
        <Heading as="div" fontSize={'md'} whiteSpace="pre-wrap" minW={'200px'} noOfLines={2}>
          <HighlightSearchText value={item.basicInfo.title} />
        </Heading>
        {item.status}
        <HStack>
          <StatusBadge status={item.status!} label={item.status == 'pending' ? 'Waiting for Approval' : undefined} />
        </HStack>
      </Stack>
    </HStack>
  )
}

const Row = ({ item }: { item: IInstructorCourse }) => {
  const { onShow } = useSimpleDialog()
  const subColor = useSubtitleColor()
  const toast = useAppToast()
  const { mutate: convertCourseToDraft } = useConvertCourseToDraft()
  const { mutate: convertCourseToInactive } = useConvertCourseToInactive()
  const router = useRouter()

  const renderCourseInfo = useMemo(() => {
    const onConvertCourseToDraft = () => {
      convertCourseToDraft(item._id, {
        onSuccess: () => {
          toast(NotifyHelper.success(`${item.basicInfo.title} converted to Draft`))
        },
      })
    }

    const onDeactivate = () => {
      onShow({
        title: 'Confirm Deactivation',
        content: (
          <>
            <Text fontWeight={'bold'} fontSize={'lg'}>
              Do you want to deactivation this course?
            </Text>{' '}
            This means that the course is no longer visible to students, and they will not be able to enroll the course
            materials but enrolled students can still access the course. You will need to ask your administrator to be
            able to reopen the course.
          </>
        ),
        colorScheme: 'blue',
        onPositive: () => {
          convertCourseToInactive(item._id, {
            onSuccess: (_) => {
              toast(NotifyHelper.success('Course deactivated'))
            },
            onError: (_) => {
              toast(NotifyHelper.somethingWentWrong)
            },
          })
        },
      })
    }

    const actions = [
      {
        name: Helper.lodash.capitalize(lan.EDIT),
        icon: FiEdit2,
        onClick: () => {
          router.push(PathHelper.getInstructorCourseFormPath(item._id))
        },
      },
    ]

    if (item.status == 'active') {
      actions.push({
        name: Helper.lodash.capitalize(lan.DEACTIVATE),
        icon: IoIosRemoveCircleOutline,
        onClick: async () => onDeactivate(),
      })
    }

    switch (item.status) {
      case 'draft':
        return (
          <>
            <Td colSpan={3}>
              <OverlayBox left={'150px'} pl={0} ml={8}>
                <OverlayLink
                  href={PathHelper.getInstructorCourseFormPath(item._id, 'goal')}
                  title="Edit / Manage"
                ></OverlayLink>
              </OverlayBox>
            </Td>
          </>
        )
      case 'rejected':
        return (
          <>
            <Td colSpan={3}>
              <OverlayBox left={'150px'} pl={0} ml={8}>
                <Button onClick={onConvertCourseToDraft} variant={'unstyled'} w="full" h="full">
                  <Heading fontSize={'2xl'}>Convert to Draft</Heading>
                </Button>
              </OverlayBox>
            </Td>
          </>
        )

      default:
        return (
          <>
            <Td>
              <Stack>
                <Heading fontSize={'3xl'} fontWeight={'light'} color={subColor}>
                  {item.numStudentLoved}
                </Heading>
                <Text>Love</Text>
              </Stack>
            </Td>
            <Td sx={hoverShowOverlayStyle}>
              <Stack>
                <Heading fontSize={'3xl'} fontWeight={'light'} color={subColor}>
                  {item.numStudent}
                </Heading>
                <Text>Students</Text>
              </Stack>
              <OverlayBox>
                <OverlayLink
                  textAlign="left"
                  fontSize="lg"
                  href={PathHelper.getInstructorStudentsPath(item._id)}
                  title="View students"
                />
              </OverlayBox>
            </Td>

            <Td sx={hoverShowOverlayStyle}>
              <Stack>
                <HStack>
                  <Heading fontSize={'3xl'} fontWeight={'light'} color={subColor}>
                    {CourseHelper.formatRatingValue(item.meta.avgRatingScore!)}
                  </Heading>
                  <RatingStar value={item.meta.avgRatingScore!} />
                </HStack>
                <Text>Course rating</Text>
              </Stack>
              <OverlayBox>
                <OverlayLink
                  textAlign="left"
                  fontSize="lg"
                  href={PathHelper.getInstructorReviewsPath(item._id)}
                  title="View reviews"
                />
              </OverlayBox>
            </Td>

            <Td>
              <RowActions actions={actions} />
            </Td>
          </>
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item._id, item.basicInfo.title, item.meta.avgRatingScore, item.numStudent, item.numStudentLoved, item.status])

  const renderContent = useMemo(() => {
    switch (item.status) {
      case 'rejected':
      case 'draft':
        return (
          <Tr sx={hoverShowOverlayStyle}>
            <Td w="600px">
              <NextLink href={PathHelper.getCourseDetailPath(item.basicInfo.slug)}>
                <TdContent item={item} />
              </NextLink>
            </Td>
            {renderCourseInfo}
          </Tr>
        )

      default:
        return (
          <Tr>
            <Td w="600px">
              <TdContent item={item} />
            </Td>
            {renderCourseInfo}
          </Tr>
        )
    }
  }, [item, renderCourseInfo])
  return <>{renderContent}</>
}

const RowMemo = React.memo(Row)

function CourseTable() {
  const { isLoading, data } = useInstructorCoursesQuery()
  const renderItem = useCallback((item: IInstructorCourse, i: number) => {
    return <RowMemo key={item._id} item={item} />
  }, [])
  return (
    <InstructorTableContainer length={data?.length} isLoading={isLoading}>
      <Table variant="simple">
        <Tbody>{data?.map(renderItem)}</Tbody>
      </Table>
    </InstructorTableContainer>
  )
}

export default React.memo(CourseTable)
