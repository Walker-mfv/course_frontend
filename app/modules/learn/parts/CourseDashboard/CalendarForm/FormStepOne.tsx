import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RadioGroup,
  Select as SelectChakra,
  Stack,
  Text,
  useRadioGroup,
} from '@chakra-ui/react'
import { useLearningCourses } from '@client/queries/learning-courses-query.hook'
import { yupResolver } from '@hookform/resolvers/yup'
import MyFormLabel from '@shared/components/form-set/MyFormLabel'
import MyInput from '@shared/components/form-set/MyInput'
import { RadioCard } from '@shared/components/form-set/RadioCard'
import FormMsg from 'app/utils/constants/form-message.constant'
import { chakraComponents, Select } from 'chakra-react-select'
import { useEffect } from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FormData } from '../CalendarEvents'

interface FormProps {
  handleNextStep: () => void
  values: FormData
  setValues: (values: FormData) => void
}

const durationOptions = [
  { value: '5', label: '5 min' },
  { value: '10', label: '10 min' },
  { value: '20', label: '20 min' },
  { value: '30', label: '30 min' },
  { value: '60', label: '1 hr' },
  { value: 'CUSTOM', label: 'Custom' },
]

const customDurationUnitOptions = [
  { value: '1', label: 'Minutes' },
  { value: '60', label: 'Hours' },
]

export function FormStepOne({ handleNextStep, values, setValues }: FormProps) {
  const { isLoading, data: myCourses } = useLearningCourses()
  const courses = myCourses?.map((course) => ({
    value: {
      title: course.course.basicInfo.title,
      slug: course.course.basicInfo.slug,
    },
    label: course.course.basicInfo.title,
  }))

  const initialValues = yup.object({
    name: yup.string().required(FormMsg.required),
    custom_duration: yup.number().when('duration', (duration, schema) => {
      return duration === 'CUSTOM'
        ? schema.required(FormMsg.required).test('max', `must be less than 100`, (value: number) => {
            return value < 100
          })
        : schema
    }),
  })

  // FORM HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(initialValues),
  })

  useEffect(() => {
    const { name, course, duration, time, custom_duration, custom_duration_unit } = values
    reset({ name, course, duration, time, custom_duration, custom_duration_unit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])

  const customComponents = {
    Option: ({ children, ...props }: any) => (
      <chakraComponents.Option {...props}>
        {props.data.icon} {children}
      </chakraComponents.Option>
    ),
  }

  const { field } = useController({
    control,
    name: 'duration',
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'duration',
    onChange: field.onChange,
    value: field.value,
    defaultValue: values.duration,
  })

  const group = getRootProps()

  const onSubmit = handleSubmit(async (newValues) => {
    handleNextStep()

    setValues({
      ...values,
      ...newValues,
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={6}>
        <MyInput
          field="name"
          label={'Name'}
          register={register}
          error={errors.name}
          placeholder="Time to learn!!!"
          required
        />
        <Controller
          control={control}
          name="course"
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControl>
              <FormLabel>Course</FormLabel>
              <Select
                name={name}
                options={courses}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Select course..."
                components={customComponents}
                isLoading={isLoading}
              />
            </FormControl>
          )}
        />
        <FormControl>
          <MyFormLabel required>Duration</MyFormLabel>
          <RadioGroup>
            <HStack {...group}>
              {durationOptions.map((option, index) => {
                const radio = getRadioProps({ value: option.value })
                return (
                  <RadioCard key={index} {...radio}>
                    {option.label}
                  </RadioCard>
                )
              })}
            </HStack>
          </RadioGroup>
        </FormControl>
        {getValues('duration') === 'CUSTOM' && (
          <Stack spacing={1}>
            <MyFormLabel required>Custom duration</MyFormLabel>
            <HStack spacing={'1px'}>
              <Controller
                name="custom_duration"
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
                <SelectChakra {...register('custom_duration_unit')}>
                  {customDurationUnitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectChakra>
              </FormControl>
            </HStack>
            {errors.custom_duration && (
              <Text color={'red.500'} fontSize={'sm'}>
                Duration {errors.custom_duration?.message}
              </Text>
            )}
          </Stack>
        )}
        <Stack spacing={0}>
          <MyFormLabel required>Time</MyFormLabel>
          <Controller
            name={'time'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return <Input type="time" onChange={onChange} value={value || ''} maxW={'12rem'} />
            }}
          />
        </Stack>
        <HStack justifyContent={'end'} mt={6}>
          <Button colorScheme={'purple'} type="submit">
            Next
          </Button>
        </HStack>
      </Stack>
    </form>
  )
}
