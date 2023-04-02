import { Box, Heading, HeadingProps, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import AppImg from '../../../utils/constants/app-img.constant'
import PathHelper from '../../../utils/helpers/path.helper'
import NextLink from '../../shared/components/NextLink'

const AppLogo = () => {
  return <Image src={AppImg.APP_LOGO} w="200px" h="40px" alt={'logo'} />
}

export interface AppHeadingProps extends HeadingProps {}
function AppHeading(props: AppHeadingProps) {
  return (
    <HStack>
      <NextLink href={PathHelper.getClientPath()}>
        <Heading fontSize={{ base: 'lg', md: '2xl' }} {...props}>
          <AppLogo />
        </Heading>
      </NextLink>
    </HStack>
  )
}

export default React.memo(AppHeading)
