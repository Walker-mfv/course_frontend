import { Box, Heading, HeadingProps, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import AppImg from 'app/utils/constants/app-img.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'

const AppLogo = () => {
  return <Image userSelect={'none'} maxWidth={'unset'} src={AppImg.APP_LOGO} w="200px" h="40px" alt={'logo'} />
}

export interface AppHeadingProps extends HeadingProps {}
function AppHeading(props: AppHeadingProps) {
  return (
    <NextLink href={PathHelper.getClientPath()}>
      <AppLogo />
    </NextLink>
  )
}

export default React.memo(AppHeading)
