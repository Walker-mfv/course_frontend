import { useSimpleDialog } from '@admin/providers/simple-dialog.provider'
import { HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import Card from '@shared/components/Card'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import { ICalendarEvent } from '@shared/interfaces/models/user.interface'
import { checkAuthCalendar } from 'app/apis/user/user.api'
import AppIcon from 'app/utils/constants/app-icon.constant'
import Helper from 'app/utils/helpers/helper.helper'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import PathHelper from 'app/utils/helpers/path.helper'
import { BsCalendar2Date } from 'react-icons/bs'
import { FiTrash } from 'react-icons/fi'
import { useDeleteCalendarEvent, useGoogleCalendarAuth } from '../../queries/google-calendar.hook'

interface CalendarCardProps {
  event: ICalendarEvent
}

export function CalendarCard({ event }: CalendarCardProps) {
  const { data: isAuthGoogleCalendar } = useGoogleCalendarAuth()

  const notification_text = event.notification_method === 'email' ? ', as email' : ''
  const notification_time_before = Helper.formatTimeString(Number(event.notification_time_before))

  const duration = Helper.formatTimeString(
    (new Date(event.end_time).getTime() - new Date(event.start_time).getTime()) / 1000 / 60
  )
  const start_time = new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const end_date = event.until && Helper.getDateLocaleString(event.until)
  const frequency = event.frequency === 'ONCE' ? Helper.getDateLocaleString(event.start_time) : 'Daily'

  const handleLoginGoogleCalendar = () => {
    if (isAuthGoogleCalendar) return
    const width1 = 550
    const height1 = 500
    const left = window.screenX + (window.outerWidth - width1) / 2
    const top = window.screenY + (window.outerHeight - height1) / 2.5
    const title = `Sign in google calendar`
    const popup = window.open(
      PathHelper.getGoogleCalendarLoginUrl(),
      title,
      `width=${width1},height=${height1},left=${left},top=${top}`
    )

    const timer = setInterval(async () => {
      const checkAuthGoogleCalendar = await checkAuthCalendar()
      if (popup?.closed || checkAuthGoogleCalendar) {
        clearInterval(timer)
        setTimeout(() => {
          popup?.close()
        }, 1000)
      }
    }, 1000)
  }

  const Actions = () => {
    const toast = useAppToast()
    const simpleDialog = useSimpleDialog()
    const { mutate: deleteEvent } = useDeleteCalendarEvent()
    const onDelete = async () => {
      simpleDialog.onShow({
        title: `Delete your event calendar`,
        content: `Are you sure you want to delete your event calendar?`,
        onPositive: async () => {
          deleteEvent(event.id)
          toast(NotifyHelper.success('Event calendar deleted'))
        },
      })
    }

    return (
      <Menu>
        <MenuButton variant="unstyled" as={IconButton} icon={<Icon as={AppIcon.moreVertical} />}></MenuButton>
        <MenuList>
          {isAuthGoogleCalendar ? (
            <MenuItem onClick={onDelete} icon={<FiTrash fontSize={'15px'} />}>
              Delete
            </MenuItem>
          ) : (
            <MenuItem onClick={handleLoginGoogleCalendar} icon={<Icon fontSize={'25px'} as={AppIcon.google} />}>
              Log in
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    )
  }

  return (
    <Card border={'1px solid'} borderColor={'gray.200'} p={5}>
      <HStack align="flex-start" spacing={4}>
        <BsCalendar2Date fontSize={'1.6rem'} />
        <Stack flex={1} spacing={1} fontSize={'0.95rem'}>
          <Text fontWeight={600} fontSize={'1.1rem'}>
            {event.summary}
          </Text>
          <Stack spacing={0}>
            <Text>{event.course_title}</Text>
            <Text>{frequency}</Text>
            <Text>
              Reminder notification {notification_time_before} before{notification_text}
            </Text>
            <Text>
              {duration} at {start_time}
            </Text>
            {end_date && <Text>Until {end_date}</Text>}
          </Stack>
        </Stack>
        <Actions />
      </HStack>
    </Card>
  )
}
