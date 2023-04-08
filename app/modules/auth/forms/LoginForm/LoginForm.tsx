import { Badge, Button, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormMsg from 'app/utils/constants/form-message.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import MyInput from '../../../shared/components/MyInput'
import { useAuthParams } from '../../providers/auth-params.provider'
import { useAuth } from '../../providers/auth.provider'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'

interface FormData {
  email: string
  password: string
}

const vldSchema = yup.object({
  email: yup.string().email('must be a valid email').required(FormMsg.required),
  password: yup.string().required(FormMsg.required),
})

export default function LoginForm() {
  const [formError, setFormError] = useState('')
  const {
    methods: { onLoginWithEmailAndPassword },
  } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(vldSchema),
  })
  const router = useRouter()
  const {
    state: { waitingRedirectPath },
  } = useAuthParams()

  const onSubmit = handleSubmit(async (values) => {
    const { email, password } = values
    try {
      await onLoginWithEmailAndPassword(email, password)
      const path = waitingRedirectPath || PathHelper.getClientPath()
      router.replace(path)
    } catch (e) {
      setFormError('Your credentials is invalid!')
      reset({ password: '' })
    }
  })

  useEffect(() => {
    if (isDirty) setFormError('')
  }, [isDirty])
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={{ base: 2 }}>
        {formError && (
          <Badge colorScheme={'red'} px={4} py={2}>
            {formError}
          </Badge>
        )}
        <MyInput
          autoFocus
          required
          field="email"
          placeholder={'Email'}
          label={'Email'}
          register={register}
          error={errors.email}
          watch={watch}
          showLabelRow={false}
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
          iconLeft={<LockIcon color="gray.300" />}
        />
      </Stack>
      <Button mt={5} type="submit" w="full" colorScheme={'purple'} disabled={!isDirty || isSubmitting}>
        Log In
      </Button>
    </form>
  )
}
