import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectActiveLecture } from 'app/store/course/learn-course.slice'
import TypeHelper from 'app/utils/helpers/type.helper'
import ErrorMessage from '@shared/components/message-set/ErrorMessage'
import { useSidebar } from '@shared/providers/sidebar.provider'
import { LEARN_TOP_BAR_HEIGHT } from '../../LearnTopbar/LearnTopBar'
import VideoPlayer from '../VideoPlayer/VideoPlayer'

export default function LectureContent() {
  const { isOpen } = useSidebar()
  const lecture = useSelector(selectActiveLecture)
  const video = TypeHelper.isFile(lecture?.video) ? lecture?.video : undefined
  const height = useBreakpointValue({
    base: 'fit-content',
    xl: isOpen ? '600px' : `calc(100vh - ${LEARN_TOP_BAR_HEIGHT}px)`,
  })
  if (!video) return <ErrorMessage />
  return <VideoPlayer url={video.url} height={height} />
}
