import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'
import { Button, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { UserValidation } from '../../../../validations/user.validation'
import MyInput from '../../../shared/components/form-set/MyInput'
import { useAppToast } from '../../../shared/hooks/app-toast.hook'
import SignUpSupport from '../../components/SignUpSupport'
import UserVerificationForm from '../../components/UserVerificationForm'
import { useAuth } from '../../providers/auth.provider'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const vldSchema = yup.object({
  firstName: UserValidation.firstName,
  lastName: UserValidation.lastName,
  email: UserValidation.email(),
  password: UserValidation.password,
})

export default function SignUpForm({
  isSubmitted,
  setSubmited,
}: {
  isSubmitted: boolean
  setSubmited: (value: boolean) => void
}) {
  const {
    methods: { onSignUp, isHuman },
  } = useAuth()

  const toast = useAppToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(vldSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    const { firstName, lastName, email, password } = values
    try {
      await onSignUp({ firstName, lastName, email, password })
      reset()
      setSubmited(true)
    } catch (e) {}
  })

  const isFormDisabled = isSubmitting || isSubmitted

  return (
    <Stack spacing={{ base: 2 }}>
      {!isSubmitted ? (
        <>
          <form onSubmit={onSubmit}>
            <Stack>
              <MyInput
                autoFocus
                required
                field="firstName"
                placeholder={'First name'}
                label={'First name'}
                register={register}
                error={errors.firstName}
                watch={watch}
                showLabelRow={false}
                isDisabled={isFormDisabled}
                iconLeft={<Icon as={FaUser} color="gray.300" />}
              />
              <MyInput
                required
                field="lastName"
                placeholder={'Last name'}
                label={'Last name'}
                register={register}
                error={errors.lastName}
                watch={watch}
                showLabelRow={false}
                isDisabled={isFormDisabled}
                iconLeft={<Icon as={FaUser} color="gray.300" />}
              />
              <MyInput
                required
                field="email"
                placeholder={'Email'}
                label={'Email'}
                register={register}
                error={errors.email}
                watch={watch}
                showLabelRow={false}
                isDisabled={isFormDisabled}
                iconLeft={<EmailIcon color="gray.300" />}
              />
              <MyInput
                type="password"
                required
                field="password"
                placeholder={'Password'}
                label={'Password'}
                register={register}
                error={errors.password}
                watch={watch}
                showLabelRow={false}
                isDisabled={isFormDisabled}
                iconLeft={<LockIcon color="gray.300" />}
              />
            </Stack>
            <Button mt={5} type="submit" w="full" colorScheme={'purple'} disabled={!isDirty || isSubmitting}>
              Sign Up
            </Button>
          </form>
          <SignUpSupport />
        </>
      ) : (
        <UserVerificationForm />
      )}
    </Stack>
  )
}
