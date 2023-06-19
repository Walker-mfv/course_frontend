import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ICalendarEvent } from '@shared/interfaces/models/user.interface'
import { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useGoogleCalendar } from '../../queries/google-calendar.hook'
import { CalendarCard } from './CalendarCard'
import { FormStepOne } from './CalendarForm/FormStepOne'
import { FormStepTwo } from './CalendarForm/FormStepTwo'

type NotificationMethod = 'popup' | 'email'

export type FormData = {
  name: string
  course?: {
    value: {
      title: string
      slug: string
    }
    label?: string
  }
  duration: string
  custom_duration?: string
  custom_duration_unit?: string
  time: string
  notification_method: NotificationMethod
  notification_time: string
  notification_time_unit: string
  frequency: string
  date_reminder?: Date
  end_date?: Date
  is_auth_calendar: boolean
}

export const initialData: FormData = {
  name: 'Time to learn!!!',
  duration: '5',
  time: '12:00',
  notification_method: 'popup',
  notification_time: '30',
  frequency: 'ONCE',
  notification_time_unit: '1',
  is_auth_calendar: false,
}

export default function CalendarEvents() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentStep, setCurrentStep] = useState(1)
  const [values, setValues] = useState<FormData>(initialData)
  const { data: events } = useGoogleCalendar()

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleOpenModal = () => {
    onOpen()
    setCurrentStep(1)
    setValues(initialData)
  }

  return (
    <Box>
      <Heading fontSize={'3xl'} fontWeight={'600'} mb={6}>
        Learning reminders
      </Heading>
      <Text mb={1}>
        Learning a little each day adds up. Research shows that students who make learning a habit are more likely to
        reach their goals. Set time aside to learn and get reminders using your learning scheduler.
      </Text>
      <Text fontSize={'0.85rem'} color={'gray.400'} mb={6}>
        Requires Google Calendar
      </Text>
      <Button
        onClick={handleOpenModal}
        rightIcon={<AiOutlinePlusCircle />}
        colorScheme={'purple'}
        size={'lg'}
        boxShadow={'md'}
      >
        Schedule learning time
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent mt={'6rem'} pt={2} pb={4}>
          <ModalHeader>Create an event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={'gray.500'} fontSize={'0.9rem'} mb={6}>
              Step {currentStep} of 2
            </Text>
            {currentStep === 1 && <FormStepOne handleNextStep={handleNextStep} values={values} setValues={setValues} />}
            {currentStep === 2 && (
              <FormStepTwo
                handlePreviousStep={handlePreviousStep}
                values={values}
                setValues={setValues}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack mt={6} spacing={4}>
        {events?.map((event: ICalendarEvent) => (
          <CalendarCard key={event.id} event={event} />
        ))}
      </Stack>
    </Box>
  )
}
