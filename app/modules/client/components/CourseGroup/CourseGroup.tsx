import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import CourseGroupSkeleton from './CourseGroupSkeleton'
import CourseList from './CourseList'

export interface CourseGroupProps {
  isLoading: boolean
  title: string
  courses: ICourse[]
  infinite?: boolean
}

export default function CourseGroup(props: CourseGroupProps) {
  return (
    <Stack spacing={[2, 2, 4]}>
      <Box>
        <Heading fontSize={['xl', '2xl']}>{props.title}</Heading>
      </Box>
      {props.isLoading ? <CourseGroupSkeleton /> : <CourseList courses={props.courses} infinite={props.infinite} />}
    </Stack>
  )
}
