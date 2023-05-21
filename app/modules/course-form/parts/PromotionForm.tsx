import { ButtonGroup, FormControl, FormLabel, GridItem, SimpleGrid, Stack, Switch, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import SubmitButton from '@shared/components/button-set/SubmitButton'
import MyDatePicker from '@shared/components/form-set/MyDatePicker'
import MyInput from '@shared/components/form-set/MyInput'
import Price from '@shared/components/Price'
import { useCrudActions } from '@shared/hooks/data/crud-actions.hook'
import ICourse from '@shared/interfaces/models/course.interface'
import { selectFormCourse, updateCourseById } from 'app/store/course/form-course.slice'
import FormMsg from 'app/utils/constants/form-message.constant'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

type FormData = {
  enabled: boolean
  discountPrice: string
  startAt: Date
  endAt: Date
}

const formatter = (value: string) => {
  const removeLeadingZeros = value.replace(/^0+/, '')
  const removeComma = removeLeadingZeros.replace(/,/g, '')
  return removeComma
}

const formatCurrency = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function PromotionForm() {
  const item = useSelector(selectFormCourse)
  const { onXThunkUpdate } = useCrudActions()

  const vldSchema = yup.object({
    discountPrice: yup
      .string()
      .test('is empty', FormMsg.required, (value: any) => {
        return !!value
      })
      .test('is number', 'must be a number', (value) => {
        if (value) return !isNaN(Number(formatter(value)))
        return true
      })
      .test('max', `must be less than ${formatCurrency((item?.basicInfo?.price || '').toString())}`, (value) => {
        if (item?.basicInfo?.price) return Number(formatter(value as string)) < item?.basicInfo?.price
        return false
      })
      .nullable(),
    endAt: yup.date().required(),
    startAt: yup.date().required(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    watch,
    setValue,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(vldSchema),
  })

  const itemStatus = !!item
  // SET DEFAULT VALUE
  useEffect(() => {
    if (!!item) {
      const defaultValues: Partial<FormData> = {
        enabled: item.promotions.enabled,
        discountPrice: formatCurrency(item.promotions?.discountPrice?.toString() || ''),
        startAt: item?.promotions?.startAt ? new Date(item.promotions.startAt) : new Date(),
        endAt: item?.promotions?.endAt ? new Date(item.promotions.endAt) : new Date(),
      }
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemStatus, item?.promotions, reset])

  const onSubmit = handleSubmit(async (values) => {
    let data: Partial<ICourse> = {
      promotions: {
        enabled: values.enabled,
        discountPrice: Number(formatter(values.discountPrice)),
        startAt: values.startAt.toISOString(),
        endAt: values.endAt.toISOString(),
      },
    }
    await onXThunkUpdate(updateCourseById(data))
    reset(values)
  })

  const handleFormatCurrency = (e: any) => {
    const inputValue = e.target.value
    // Format the value or perform any necessary validations
    const formattedValue = formatCurrency(formatter(inputValue))
    // console.log(formattedValue)
    setValue('discountPrice', formattedValue)
  }

  const enabledWatch = watch('enabled')
  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <FormControl display="flex" alignItems="center">
          <FormLabel fontWeight={'light'} htmlFor="enable-promotion" mb="0">
            Enable course Promotion
          </FormLabel>
          <Controller
            control={control}
            name="enabled"
            render={({ field }) => {
              return <Switch id="enable-promotion" isChecked={field.value} onChange={field.onChange} />
            }}
          />
        </FormControl>
        <Stack display={enabledWatch ? 'flex' : 'none'}>
          <MyInput
            autoFocus
            required
            field="discountPrice"
            label={'Discount price'}
            register={register}
            type="text"
            onChange={handleFormatCurrency as any}
            max={item?.basicInfo.price || 0}
            min={1}
            error={errors.discountPrice}
            iconLeft={
              <Text color="gray.400" fontSize={'1.2rem'}>
                ₫
              </Text>
            }
          />
          <Text color={'gray.500'} fontSize={'0.95rem'}>
            Origin price:&nbsp;
            {item?.basicInfo.price ? <Price value={item?.basicInfo.price} currency={'vnd'} /> : 'Not set yet'}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <GridItem colSpan={1}>
              <MyDatePicker label="Start at" control={control} field={'startAt'} showTimeSelect />
            </GridItem>
            <GridItem colSpan={1}>
              <MyDatePicker label="End at" control={control} field={'endAt'} showTimeSelect />
            </GridItem>
          </SimpleGrid>
        </Stack>
        <ButtonGroup justifyContent={'end'}>
          <SubmitButton disabled={!isDirty || isSubmitting} />
        </ButtonGroup>
      </Stack>
    </form>
  )
}
