import { useAuth } from '@auth/providers/auth.provider'
import { RQK_AUTH_USER } from '@auth/queries/auth-user-query.hook'
import { Button, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import EditableAvatar from '@shared/components/EditableAvatar'
import MyInput from '@shared/components/form-set/MyInput'
import MyProgressBar from '@shared/components/MyProgress'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import { useUploadImage } from '@shared/hooks/upload-image.hook'
import { IProfile, IUser } from '@shared/interfaces/models/user.interface'
import Editor from '@shared/parts/Editor/Editor'
import { apiEditProfile } from 'app/apis/user/user.api'
import FieldLabel from 'app/utils/constants/field-label.constant'
import { AVATAR_DIR } from 'app/utils/constants/firebase.constant'
import FormMsg from 'app/utils/constants/form-message.constant'
import Helper from 'app/utils/helpers/helper.helper'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'

type FormData = {
  firstName: string
  lastName: string
  avatar: string
  phone?: string
  address?: string
  headline?: string
  biography?: string
}

const ProfileForm = () => {
  const {
    state: { user },
  } = useAuth()

  const [isAvatarChanged, setAvatarChanged] = useState(false)
  const queryClient = useQueryClient()
  const toast = useAppToast()
  const [item, setItem] = useState<IProfile>()
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const isStudent = useMemo(() => user?.role.name === 'Student', [user?.role.name])

  const { handleUpload, uploadProgress, getImgSrcFuncRef } = useUploadImage(AVATAR_DIR, item?.avatar)
  const initialValues = yup.object({
    firstName: yup.string().required(FormMsg.required),
    lastName: yup.string().required(FormMsg.required),
    avatar: yup.string().nullable(),
    phone: yup.string().test('is empty', FormMsg.required, (value: any) => {
      return isStudent || !!value
    }),
    address: yup.string().nullable(),
    headline: yup.string().test('is empty', FormMsg.required, (value: any) => {
      return isStudent || !!value
    }),
    biography: yup
      .string()
      .test('is empty', FormMsg.required, (value: any) => {
        return isStudent || !!Helper.getTextFromHTML(value)
      })
      .test('min length', 'must be at least 50 characters', (value: any) => {
        return isStudent || Helper.getTextFromHTML(value).length > 50
      }),
  })

  // FORM HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
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
      avatar: user?.profile.avatar || '',
      phone: user?.profile.phone,
      headline: user?.profile.headline || '',
      biography: user?.profile.biography || '',
      address: user?.profile.address,
    }
    setItem(user?.profile)
    reset(values)
  }, [reset, user?.profile])

  // ON SUBMIT
  const onSubmit = handleSubmit(async (values) => {
    setDisabled(true)
    setAvatarChanged(false)
    handleUpload(async (_, imgSrc) => {
      const data: Partial<IUser> = {
        profile: {
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: imgSrc,
          phone: values.phone,
          address: values.address,
          headline: values.headline,
          biography: values.biography,
        } as IProfile,
      }
      try {
        const result = await apiEditProfile(data)
        setItem(result.profile)
        queryClient.invalidateQueries(RQK_AUTH_USER)
        toast(NotifyHelper.success('Profile updated'))
        reset(values)
      } catch (err) {
        console.error(err)
      }
      setDisabled(false)
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={6}>
        <Stack spacing={5}>
          <EditableAvatar
            setAvatarChanged={setAvatarChanged}
            getImgSrcFuncRef={getImgSrcFuncRef}
            field="avatar"
            label={FieldLabel['user.avatar']}
            initialSrc={item?.avatar}
          />

          <Stack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              <GridItem colSpan={1}>
                <MyInput
                  required
                  field="firstName"
                  label={FieldLabel['user.firstName']}
                  register={register}
                  error={errors.firstName}
                  autoFocus
                  placeholder="First name"
                />
              </GridItem>
              <GridItem colSpan={1}>
                <MyInput
                  required
                  field="lastName"
                  label={FieldLabel['user.lastName']}
                  register={register}
                  error={errors.lastName}
                  placeholder="Last name"
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
                  required={!isStudent}
                />
              </GridItem>
            </SimpleGrid>
            {!isStudent && (
              <>
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
              </>
            )}
            <MyInput
              field="address"
              label={FieldLabel['user.address']}
              register={register}
              error={errors.address}
              placeholder="Address"
            />

            {uploadProgress && <MyProgressBar value={uploadProgress} />}
          </Stack>
        </Stack>
        <Button colorScheme={'blue'} type="submit" disabled={(!isAvatarChanged && !isDirty) || isDisabled}>
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default ProfileForm
