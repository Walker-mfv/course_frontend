import { ICalendarEvent } from '@shared/interfaces/models/user.interface'
import { checkAuthCalendar, deleteCalendarEvent, fetchCalendarEvents } from 'app/apis/user/user.api'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'

export const RQK_GOOGLE_CALENDAR = 'google-calendar'

export const useGoogleCalendarAuth = (options?: UseQueryOptions<boolean>) => {
  return useQuery<boolean>([RQK_GOOGLE_CALENDAR, 'auth'], checkAuthCalendar, {
    notifyOnChangeProps: 'tracked',
    ...options,
  })
}

export const useGoogleCalendar = (options?: UseQueryOptions<ICalendarEvent[]>) => {
  return useQuery<ICalendarEvent[]>([RQK_GOOGLE_CALENDAR], fetchCalendarEvents, {
    notifyOnChangeProps: ['data'],
    ...options,
  })
}

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient()
  return useMutation((eventId: string) => deleteCalendarEvent(eventId), {
    onSuccess: () => {
      queryClient.invalidateQueries(RQK_GOOGLE_CALENDAR)
    },
  })
}
