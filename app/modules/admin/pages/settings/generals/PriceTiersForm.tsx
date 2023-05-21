import { useConfigurationQuery, useUpdateConfiguration } from '@admin/queries/configuration-query.hook'
import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import SubmitButton from '@shared/components/button-set/SubmitButton'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import IConfiguration from '@shared/interfaces/models/configuration.interface'
import AppIcon from 'app/utils/constants/app-icon.constant'
import FormMsg from 'app/utils/constants/form-message.constant'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import React, { useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'

const formatter = (value: string) => {
  const removeLeadingZeros = value.replace(/^0+/, '')
  const removeComma = removeLeadingZeros.replace(/,/g, '')
  return removeComma
}

const formatCurrency = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const vldSchema = yup.object({
  priceTiers: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .test('is empty', FormMsg.required, (value: any) => {
            return !!value
          })
          .test('is number', 'must be a number', (value) => {
            if (value) return !isNaN(Number(formatter(value)))
            return true
          })
          .test('max', `must be less than 10,000,000`, (value) => {
            if (value) return Number(formatter(value as string)) < 10000000
            return false
          })
          .test('min', `must be less than 1000`, (value) => {
            if (value) return Number(formatter(value as string)) > 1000
            return false
          })
          .nullable(),
      })
    )
    .min(3, FormMsg.minQty({ qty: 3 })),
})

type FormData = {
  priceTiers: {
    value: string
  }[]
}

export default function PriceTiersForm() {
  const toast = useAppToast()
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(vldSchema),
    defaultValues: {
      priceTiers: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'priceTiers', // unique name for your Field Array
  })

  const { isLoading, data } = useConfigurationQuery()
  const { mutate: updateConfiguration } = useUpdateConfiguration()

  useEffect(() => {
    if (!!data) {
      const formData: FormData = {
        priceTiers: data.course.priceTiers.map((item) => ({ value: formatCurrency(item.toString()) })),
      }
      reset(formData)
    }
  }, [data, reset])

  const handleFormatCurrency = (e: any, index: number) => {
    const inputValue = e.target.value
    // Format the value or perform any necessary validations
    const formattedValue = formatCurrency(formatter(inputValue))
    // console.log(formattedValue)
    setValue(`priceTiers.${index}.value`, formattedValue)
  }

  const renderItem = useCallback(
    (field: Record<'id', string>, index: number) => {
      return (
        <Stack key={field.id}>
          <HStack spacing={0}>
            <Text minW={'75px'}>Tier {index + 1}</Text>
            <InputGroup>
              {/* eslint-disable-next-line react/no-children-prop */}
              <InputLeftElement pointerEvents="none" color="gray.400" fontSize="1.2em" children="₫" />
              <Input
                {...register(`priceTiers.${index}.value`)}
                type={'text'}
                onChange={(e) => {
                  handleFormatCurrency(e, index)
                  register(`priceTiers.${index}.value`).onChange(e)
                }}
              />
              <InputRightElement>
                <IconButton
                  onClick={() => remove(index)}
                  variant="ghost"
                  aria-label=""
                  size="sm"
                  icon={<Icon as={AppIcon.delete} />}
                />
              </InputRightElement>
            </InputGroup>
          </HStack>
          <HStack>
            <Text minW={'75px'}></Text>
            {errors.priceTiers && errors.priceTiers[index] && (
              <Text color={'red.500'} fontSize={'sm'}>
                Price tier {errors.priceTiers[index]?.value?.message}
              </Text>
            )}
          </HStack>
        </Stack>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [register, remove, errors.priceTiers]
  )

  const onSubmit = handleSubmit(async (values) => {
    const data: Partial<IConfiguration> = {
      course: {
        priceTiers: values.priceTiers.map((item) => Number(formatter(item.value))),
      },
    }
    updateConfiguration(data, {
      onSuccess: (_) => {
        toast(NotifyHelper.success('Configuration updated'))
      },
      onError: (_) => {
        toast(NotifyHelper.somethingWentWrong)
      },
    })
  })

  const errorMessage = (errors.priceTiers as any)?.message
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={4}>
        <Heading fontSize={'xl'}>Price Tiers</Heading>

        <Skeleton isLoaded={!isLoading}>
          <HStack justify={'start'}>
            <Stack flex={1}>
              {!!errorMessage && (
                <HStack justify={'end'}>
                  <Text color={'red'} fontSize={'sm'}>
                    Price Tiers {errorMessage}
                  </Text>
                </HStack>
              )}
              <ButtonGroup justifyContent={'end'}></ButtonGroup>
              {fields.map(renderItem)}
              <ButtonGroup justifyContent={'space-between'} pl="75px">
                <Button
                  onClick={() => append({ value: undefined as any })}
                  colorScheme={'purple'}
                  leftIcon={<Icon as={AppIcon.add} />}
                  size="sm"
                >
                  Add
                </Button>
                <SubmitButton disabled={!isDirty || isSubmitting} size={'sm'} />
              </ButtonGroup>
            </Stack>
          </HStack>
        </Skeleton>
      </Stack>
    </form>
  )
}
