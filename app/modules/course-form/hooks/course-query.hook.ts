import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchById } from 'app/apis/acp/admin.api'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import ICourse from '@shared/interfaces/models/course.interface'
import {
  apiApproveCourse,
  apiConvertCourseToInActive,
  apiSubmitForReview,
  fetchCourseBriefById,
  TApproveStatus,
} from 'app/apis/course/course.api'

export const RQK_COURSE = 'course'
export const useCourseQuery = (id?: string) => {
  return useQuery<ICourse>([RQK_COURSE, id], () => fetchById<ICourse>('courses', id!), {
    notifyOnChangeProps: 'tracked',
    enabled: !!id,
  })
}

export const RQK_COURSE_BRIEF = 'course-brief'
export const useCourseBriefQuery = (id?: string) => {
  return useQuery<ICourse>([RQK_COURSE_BRIEF, id], () => fetchCourseBriefById(id!), {
    notifyOnChangeProps: 'tracked',
    enabled: !!id,
  })
}

export const useSubmitForReview = () => {
  const queryClient = useQueryClient()
  return useMutation((id: string) => apiSubmitForReview(id), {
    onMutate: () => {},
    onSuccess: (_) => {
      queryClient.invalidateQueries(CONTROLLER.course)
    },
  })
}

export const useApproveCourse = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (payload: { id: string; status: TApproveStatus }) => apiApproveCourse(payload.id, payload.status),
    {
      onMutate: () => {},
      onSuccess: (_) => {
        queryClient.invalidateQueries(CONTROLLER.course)
      },
    }
  )
}

export const useDeactiveCourse = () => {
  const queryClient = useQueryClient()
  return useMutation((id: string) => apiConvertCourseToInActive(id), {
    onMutate: () => {},
    onSuccess: (_) => {
      queryClient.invalidateQueries(CONTROLLER.course)
    },
  })
}
