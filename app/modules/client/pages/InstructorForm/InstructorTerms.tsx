import { useSwitchToInstructor } from '@auth/queries/auth-user-query.hook'
import { Button, Checkbox, FormControl, FormErrorMessage, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useClientToast } from '@shared/hooks/client-toast.hook'
import { useIBg } from '@shared/hooks/style.hook'
import CookieHelper from 'app/utils/helpers/cookie.helper'
import { LocalRegisterHelper } from 'app/utils/helpers/localStorage.helper'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import PathHelper from 'app/utils/helpers/path.helper'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type FormData = {
  instructor_terms: boolean
  business_program: boolean
}

const InstructorTerms = () => {
  const toast = useClientToast()
  const router = useRouter()
  const { mutate: switchToInstructor } = useSwitchToInstructor()
  const textColor = useIBg()

  const initialValues = yup.object({
    instructor_terms: yup.boolean().oneOf([true], 'You must agree to the Instructor Terms'),
    business_program: yup.boolean().oneOf([true], 'You must agree to the Business Program'),
  })

  // FORM HOOKS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(initialValues),
  })

  // ON SUBMIT
  const onSubmit = handleSubmit(() => {
    // notification to student when they switch to instructor
    switchToInstructor(undefined, {
      onSuccess: () => {
        CookieHelper.removeAccessToken()
        LocalRegisterHelper.clearRegisterStep()
        router.push(PathHelper.getInstructorPath('courses')).then(() => {
          toast(NotifyHelper.success('Welcome to Instructor community!'))
          toast(NotifyHelper.success("Let's create your first course."))
        })
      },
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={!!errors.instructor_terms}>
        <Stack mb={4}>
          <Text fontWeight={600} fontSize={'xl'}>
            Instructor Terms
          </Text>
          <Text fontSize={'0.95rem'} color={textColor} lineHeight={'1.6'}>
            When you sign up to become an instructor on the Udemy platform, you agree to abide by the Instructor Terms.
            They cover details about the Udemy platform that are relevant to instructors (including pricing, payments,
            and your obligations as an instructor), so it’s important to read them. I have read and agree to the Udemy
            Instructor Terms.
          </Text>
          <Checkbox {...register('instructor_terms')}>I have read and agree to the Instructor Terms.</Checkbox>
          {errors.instructor_terms && <FormErrorMessage>{errors.instructor_terms.message}</FormErrorMessage>}
        </Stack>
      </FormControl>
      <FormControl isInvalid={!!errors.business_program}>
        <Stack>
          <Text fontWeight={600} fontSize={'xl'}>
            Business Program
          </Text>
          <Text fontSize={'0.95rem'} color={textColor} lineHeight={'1.6'}>
            Udemy Business Program The Udemy Business Collection is a subscription-based content collection available to
            business customers, featuring a select group of Udemy’s top content for professional and personal
            development skills. By opting into the Udemy Business Program, you give Udemy the ability to select your
            content for inclusion in the Udemy Business Collection. You also agree that, if your course is selected for
            inclusion, you will not begin to offer any equivalent on-demand content on any competitor site or platform
            other than your own.
          </Text>
          <Checkbox {...register('business_program')}>I have read and agree to the Business Program.</Checkbox>
          {errors.business_program && <FormErrorMessage>{errors.business_program.message}</FormErrorMessage>}
        </Stack>
      </FormControl>
      <Button colorScheme={'blue'} type="submit" w={'fit-content'} mt={6}>
        Save and continue
      </Button>
    </form>
  )
}

export default InstructorTerms
