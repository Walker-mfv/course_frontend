import { fetchCourseBySlug } from 'app/apis/course/client-course.api'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import TypeHelper from 'app/utils/helpers/type.helper'
import { useRouter } from 'next/router'
import { useQuery, UseQueryOptions } from 'react-query'

export const RQK_COURSE_DETAIL = 'course-detail'
export const getCourseDetailSlug = (params: any) => {
  const { courseSlug = '' } = params
  return courseSlug
}

export const useCourseDetailQuery = (options?: UseQueryOptions<ICourse>) => {
  const router = useRouter()
  const courseSlug = getCourseDetailSlug(router.query)
  return useQuery<ICourse>([RQK_COURSE_DETAIL, courseSlug], () => fetchCourseBySlug(courseSlug + ''), {
    notifyOnChangeProps: 'tracked',
    ...options,
  })
}

// CURRICULUM
export const useCourseDetailCurriculum = () => {
  return useCourseDetailQuery().data?.details.sections
}

export const useCourseDetailSection = (sIdx: number) => {
  return useCourseDetailQuery().data?.details.sections?.[sIdx]
}

export const useCourseDetailSectionDuration = (sIdx: number) => {
  return useCourseDetailQuery().data?.details.sections?.[sIdx].units.reduce((prev, current) => {
    const lecture = TypeHelper.isLecture(current.lecture) ? current.lecture : undefined

    if (lecture) {
      const video = TypeHelper.isFile(lecture.video) ? lecture.video : undefined
      if (video) return prev + (video.duration || 0)
    }
    return prev
  }, 0)
}

export const useCourseDetailUnit = (sIdx: number, uIdx: number) => {
  return useCourseDetailQuery().data?.details.sections?.[sIdx].units[uIdx]
}

// OBJECTIVES
export const useCourseDetailObjectives = () => {
  return useCourseDetailQuery().data?.details.objectives
}

// REQUIREMENTS
export const useCourseDetailRequirements = () => {
  return useCourseDetailQuery().data?.details.requirements
}

// SUITABLE LEARNERS
export const useCourseDetailSuitableLearners = () => {
  return useCourseDetailQuery().data?.details.suitableLearner
}

// DESCRIPTION
export const useCourseDetailDescription = () => {
  return useCourseDetailQuery().data?.details.description
}

// META
export const useCourseDetailMeta = () => {
  return useCourseDetailQuery().data?.meta
}
