import { Button, Icon, useColorModeValue } from '@chakra-ui/react'
import AppIcon from 'app/utils/constants/app-icon.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import React from 'react'

export default function GoogleLoginButton() {
  const bg = useColorModeValue('blackAlpha.50', undefined)

  return (
    <a href={PathHelper.getGoogleLoginUrl()}>
      <Button
        bg={bg}
        shadow="md"
        leftIcon={<Icon fontSize={'25px'} as={AppIcon.google} />}
        w="full"
        iconSpacing={4}
        justifyContent={'left'}
        mb={5}
      >
        Continue with Google
      </Button>
    </a>
  )
}
