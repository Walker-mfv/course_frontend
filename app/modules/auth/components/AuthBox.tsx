import { Container, Heading, Stack, StackDivider, Text, Image, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import AppImg from 'app/utils/constants/app-img.constant'
import { useBorderColor } from '../../shared/hooks/style.hook'

export interface AuthBoxProps {
  title: string
  description?: string
  children: ReactNode
}
export default function AuthBox(props: AuthBoxProps) {
  const bg = useColorModeValue('white', undefined)
  const borderColor = useBorderColor()
  const border = useColorModeValue('none', '2px solid')
  return (
    <Container
      border={border}
      borderColor={borderColor}
      borderRadius="lg"
      mx="auto"
      mt={10}
      mb={5}
      maxW={'400px'}
      shadow="xl"
      p={{ base: undefined, md: 4, lg: 8 }}
      py={4}
      bg={bg}
    >
      <Stack spacing={{ base: 4, md: 7 }} divider={<StackDivider color={borderColor} />}>
        <Heading fontSize={'lg'} textAlign="center">
          <Image mb={3} src={AppImg.LOGO_IMAGE} alt={'logo'} width="80px" mx={{ base: 'auto' }} />
          <p>{props.title}</p>
          <Text as="sub" color={'gray.500'} fontWeight="400">
            {props?.description}
          </Text>
        </Heading>
        <Stack px={{ base: undefined, md: 4 }}>{props.children}</Stack>
      </Stack>
    </Container>
  )
}
