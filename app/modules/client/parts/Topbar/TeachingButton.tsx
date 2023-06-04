import { useAuth } from '@auth/providers/auth.provider'
import {
  Button,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from '@shared/components/NextLink'
import React from 'react'

export default function TeachingButton(props: ButtonProps) {
  const {
    state: { user },
  } = useAuth()
  const isStudent = user?.role.name == 'Student'

  if (!isStudent) return <></>
  return (
    <NextLink href="user/instructor/register">
      <Popover trigger="hover">
        <PopoverTrigger>
          <Button variant="ghost" {...props}>
            Teaching with Us
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody p={3}>
            <Stack align={'center'}>
              <Text as="strong">Become an Instructor today!</Text>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </NextLink>
  )
}
