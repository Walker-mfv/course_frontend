import { useAuth } from '@auth/providers/auth.provider'
import { RQK_AUTH_USER } from '@auth/queries/auth-user-query.hook'
import { Button, GridItem, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import MyInput from '@shared/components/form-set/MyInput'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import { IProfile, IUser } from '@shared/interfaces/models/user.interface'
import Editor from '@shared/parts/Editor/Editor'
import { apiEditProfile } from 'app/apis/user/user.api'
import FieldLabel from 'app/utils/constants/field-label.constant'
import FormMsg from 'app/utils/constants/form-message.constant'
import Helper from 'app/utils/helpers/helper.helper'
import { LocalRegisterHelper } from 'app/utils/helpers/localStorage.helper'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'

type FormData = {
  firstName: string
  lastName: string
  headline: string
  phone: string
  biography: string
}

interface PersonalInformationFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const PersonalInformationForm = ({ setStep, setProgress }: PersonalInformationFormProps) => {
  const {
    state: { user },
  } = useAuth()

  const queryClient = useQueryClient()
  const toast = useAppToast()
  const [isDisabled, setDisabled] = useState<boolean>(false)

  const initialValues = yup.object({
    firstName: yup.string().required(FormMsg.required),
    lastName: yup.string().required(FormMsg.required),
    phone: yup
      .string()
      .required(FormMsg.required)
      .matches(/^\d{10}$/, 'is not valid'),
    headline: yup.string().required(FormMsg.required),
    biography: yup
      .string()
      .test('is empty', FormMsg.required, (value: any) => {
        return !!Helper.getTextFromHTML(value)
      })
      .test('min length', 'must be at least 50 characters', (value: any) => {
        return Helper.getTextFromHTML(value).length > 50
      }),
  })

  // FORM HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(initialValues),
  })

  // FORM TYPE
  useEffect(() => {
    const values: FormData = {
      firstName: user?.profile.firstName || '',
      lastName: user?.profile.lastName || '',
      phone: user?.profile.phone || '',
      headline: '',
      biography: '',
    }
    reset(values)
  }, [reset, user?.profile])

  // ON SUBMIT
  const onSubmit = handleSubmit(async (values) => {
    setDisabled(true)
    const data: Partial<IUser> = {
      profile: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        headline: values.headline,
        biography: values.biography,
      } as IProfile,
    }
    try {
      await apiEditProfile(data)
      queryClient.invalidateQueries(RQK_AUTH_USER)
      LocalRegisterHelper.setRegisterStep(2)
      setStep((prev: number) => prev + 1)
      setProgress(100)
      toast(NotifyHelper.success('Profile updated'))
      reset(values)
    } catch (err) {
      console.error(err)
    }
    setDisabled(false)
  })

  return (
    <>
      <form onSubmit={onSubmit}>
        <Heading w="100%" textAlign={'center'} fontWeight="normal" mb={6}>
          Personal Information
        </Heading>
        <Stack spacing={6}>
          <Stack spacing={5}>
            <Stack spacing={4}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                <GridItem colSpan={1}>
                  <MyInput
                    required
                    field="firstName"
                    label={FieldLabel['user.firstName']}
                    register={register}
                    error={errors.firstName}
                    placeholder="First Name"
                    autoFocus
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <MyInput
                    required
                    field="lastName"
                    label={FieldLabel['user.lastName']}
                    register={register}
                    placeholder="Last Name"
                    error={errors.lastName}
                  />
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={2}>
                <GridItem
                  colSpan={{
                    base: 2,
                    md: 1,
                  }}
                ></GridItem>
                <GridItem
                  colSpan={{
                    base: 2,
                    md: 1,
                  }}
                >
                  <MyInput
                    field="phone"
                    label={FieldLabel['user.phone']}
                    register={register}
                    error={errors.phone}
                    placeholder="Phone number"
                    required
                  />
                </GridItem>
              </SimpleGrid>
              <SimpleGrid columns={1} spacing={2}>
                <GridItem
                  colSpan={{
                    base: 2,
                    md: 1,
                  }}
                ></GridItem>
                <GridItem
                  colSpan={{
                    base: 2,
                    md: 1,
                  }}
                >
                  <MyInput
                    field="headline"
                    label={FieldLabel['user.headline']}
                    register={register}
                    error={errors.headline}
                    placeholder="Headline"
                    helperText={'Add a professional headline like, "Instructor at Udemy" or "Architect."'}
                    required
                  />
                </GridItem>
              </SimpleGrid>
              <Stack spacing={2}>
                <Controller
                  control={control}
                  name="biography"
                  render={({ field }) => (
                    <Editor
                      field="biography"
                      label={FieldLabel['user.biography']}
                      placeholder="Biography"
                      className="editor-input"
                      value={field.value}
                      onChange={field.onChange}
                      required
                    />
                  )}
                />
                {errors.biography && (
                  <Text color={'red.500'} fontSize={'sm'}>
                    Biography {errors.biography?.message}
                  </Text>
                )}
                <Text color="gray.500" fontSize="sm">
                  Your instructor biography should emphasize your experience and expertise. It should have at least 50
                  characters.
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Button colorScheme={'blue'} type="submit" disabled={isDisabled} w={'fit-content'}>
            Save and continue
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default PersonalInformationForm
