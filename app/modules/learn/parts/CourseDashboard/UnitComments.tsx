import { Heading, Stack } from '@chakra-ui/react'
import { selectActiveUnit } from 'app/store/course/learn-course.slice'
import React from 'react'
import { useSelector } from 'react-redux'
import CommentForm from '../../components/Comments/CommentForm'
import CommentList from '../../components/Comments/CommentList'
import { useUnitComments } from '../../queries/unit-comments-query.hook'

export default function UnitComments() {
  const unit = useSelector(selectActiveUnit)
  const { data, fetchNextPage, hasNextPage } = useUnitComments(unit?._id)
  const comments = data?.pages.reduce((prev, current) => {
    return prev.concat(current)
  }, [])
  return (
    <Stack>
      <Heading fontSize={'3xl'} fontWeight={'600'} mb={6}>
        Comments
      </Heading>
      <CommentForm />
      <CommentList fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} comments={comments || []} />
    </Stack>
  )
}
