import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RadioGroup,
  Select,
  Stack,
  useColorModeValue,
  useRadioGroup,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import MyDatePicker from '@shared/components/form-set/MyDatePicker'
import MyFormLabel from '@shared/components/form-set/MyFormLabel'
import { RadioCard } from '@shared/components/form-set/RadioCard'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import { checkAuthCalendar, createCalendarEvent } from 'app/apis/user/user.api'
import { RQK_GOOGLE_CALENDAR, useGoogleCalendarAuth } from 'app/modules/learn/queries/google-calendar.hook'
import AppIcon from 'app/utils/constants/app-icon.constant'
import { FRONTEND_DOMAIN } from 'app/utils/constants/app.constant'
import FormMsg from 'app/utils/constants/form-message.constant'
import Helper from 'app/utils/helpers/helper.helper'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import PathHelper from 'app/utils/helpers/path.helper'
import { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useController, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'
import { FormData } from '../CalendarEvents'

interface FormProps {
  handlePreviousStep: () => void
  values: FormData
  setValues: (values: FormData) => void
  onClose: () => void
}

const notificationMethodOptions = [
  { value: 'popup', label: 'Notification' },
  { value: 'email', label: 'Email' },
]

const notificationTimeUnitOptions = [
  { value: '1', label: 'Minutes' },
  { value: '60', label: 'Hours' },
]

const frequencyOptions = [
  { value: 'ONCE', label: 'Once' },
  { value: 'DAILY', label: 'Daily' },
]

export function FormStepTwo({ handlePreviousStep, values, setValues, onClose }: FormProps) {
  const bg = useColorModeValue('blackAlpha.50', undefined)
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { data: isAuthGoogleCalendar } = useGoogleCalendarAuth()
  const toast = useAppToast()
  const initialValues = yup.object({
    is_auth_calendar: yup.boolean().test('is true', 'Login google to save your event', (value) => {
      return !!value
    }),
    date_reminder: yup.string().when('frequency', (frequency, schema) => {
      return frequency === 'ONCE' ? schema.required(FormMsg.required) : schema
    }),
  })

  // FORM HOOKS
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(initialValues),
  })

  // FORM TYPE
  useEffect(() => {
    const {
      notification_method,
      notification_time,
      notification_time_unit,
      date_reminder,
      end_date,
      is_auth_calendar,
      frequency,
    } = values
    reset({
      notification_method,
      notification_time,
      notification_time_unit,
      date_reminder,
      end_date,
      is_auth_calendar,
      frequency,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  useEffect(() => {
    setValue('is_auth_calendar', isAuthGoogleCalendar || false)
  }, [isAuthGoogleCalendar, setValue])

  const handleClickPrevious = () => {
    handlePreviousStep()
    setValues({
      ...values,
      ...getValues(),
    })
  }

  const { field } = useController({
    control,
    name: 'frequency',
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'frequency',
    onChange: field.onChange,
    value: field.value,
    defaultValue: values.frequency,
  })

  const group = getRootProps()

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

  const onSubmit = handleSubmit(async (newValues) => {
    const data = {
      ...values,
      ...newValues,
    }

    const duration =
      data.duration === 'CUSTOM'
        ? Number(data.custom_duration) * Number(data.custom_duration_unit) * 60
        : Number(data.duration) * 60
    const [start_time, end_time] = Helper.getDateFromTime(data.time, duration, data.date_reminder)
    const end_date = data.end_date ? new Date(data.end_date.setHours(23, 59, 59)).toISOString() : null

    const course_title = data.course?.value.title || null
    const course_url = data.course?.value.slug ? `${FRONTEND_DOMAIN}/course/${data.course.value.slug}` : null

    const dataConvert: any = {
      summary: data.name,
      start_time,
      end_time,
      notification_method: data.notification_method,
      notification_time_before: Number(data.notification_time) * Number(data.notification_time_unit),
      course_title,
      course_url,
      frequency: data.frequency,
      until: end_date,
    }

    setDisabled(true)
    try {
      await createCalendarEvent(dataConvert)
      queryClient.invalidateQueries(RQK_GOOGLE_CALENDAR)
      toast(NotifyHelper.success('Create event success'))
      onClose()
    } catch (err) {
      toast(NotifyHelper.error('Create event calendar failed'))
      console.error(err)
    }
    setDisabled(false)
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={6}>
        <FormControl isInvalid={!!errors?.date_reminder}>
          <MyFormLabel required>Frequency</MyFormLabel>
          <Stack spacing={3}>
            <RadioGroup mt={3}>
              <HStack {...group}>
                {frequencyOptions.map((option, index) => {
                  const radio = getRadioProps({ value: option.value })
                  return (
                    <RadioCard key={index} {...radio}>
                      {option.label}
                    </RadioCard>
                  )
                })}
              </HStack>
            </RadioGroup>
            {getValues('frequency') === 'ONCE' && (
              <MyDatePicker
                control={control}
                field={'date_reminder'}
                isClearable={true}
                minDate={new Date()}
                placeholderText="Select date"
              />
            )}
            {errors?.date_reminder?.message && <FormErrorMessage>This {errors.date_reminder.message}</FormErrorMessage>}
          </Stack>
        </FormControl>
        {getValues('frequency') === 'DAILY' && (
          <MyDatePicker
            label="End date"
            control={control}
            field={'end_date'}
            isClearable={true}
            minDate={new Date()}
            placeholderText="Select date"
          />
        )}
        <Stack spacing={1}>
          <MyFormLabel required>Reminder</MyFormLabel>
          <HStack spacing={'1px'}>
            <FormControl maxW={'9rem'}>
              <Select {...register('notification_method')}>
                {notificationMethodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Controller
              name="notification_time"
              control={control}
              render={({ field: { ref, ...restField } }) => (
                <NumberInput {...restField} min={0} max={100} maxW={'6rem'}>
                  <NumberInputField name={restField.name} />
                  <NumberInputStepper>
                    <NumberIncrementStepper fontSize={'0.6rem'} />
                    <NumberDecrementStepper fontSize={'0.6rem'} />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormControl maxW={'10rem'}>
              <Select {...register('notification_time_unit')}>
                {notificationTimeUnitOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
        </Stack>
        <Stack>
          <FormControl isInvalid={!!errors?.is_auth_calendar}>
            <MyFormLabel required>Save your event</MyFormLabel>
            <Box mt={2}>
              <Button
                bg={bg}
                shadow="md"
                leftIcon={<Icon fontSize={'25px'} as={AppIcon.google} />}
                iconSpacing={4}
                justifyContent={'left'}
                p={4}
                onClick={handleLoginGoogleCalendar}
                disabled={isAuthGoogleCalendar}
              >
                {isAuthGoogleCalendar ? (
                  <>
                    Google <CheckCircleIcon ml={3} color={'green.500'} />
                  </>
                ) : (
                  'Save with Google'
                )}
              </Button>
            </Box>
            <Input {...register('is_auth_calendar')} hidden disabled />
            {errors?.is_auth_calendar?.message && (
              <FormErrorMessage>{errors.is_auth_calendar.message}</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <HStack justifyContent={'end'}>
          <Button onClick={handleClickPrevious} mr={2}>
            Previous
          </Button>
          <Button colorScheme={'purple'} type="submit" isDisabled={isDisabled}>
            Done
          </Button>
        </HStack>
      </Stack>
    </form>
  )
}
