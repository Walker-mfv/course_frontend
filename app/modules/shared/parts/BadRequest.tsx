import { Box, Heading, Text, Button, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { CiFaceFrown } from 'react-icons/ci'
import { useCardBg } from '../hooks/style.hook'

export function BadRequest() {
  const bg = useCardBg()
  const router = useRouter()

  return (
    <Box
      textAlign="center"
      mt={10}
      mx={'auto'}
      background={bg}
      maxW={'700px'}
      px={5}
      py={8}
      display={'flex'}
      alignItems={'center'}
      borderRadius={'lg'}
      boxShadow={'md'}
      flexDirection={'column'}
    >
      <Icon as={CiFaceFrown} w={16} h={16} mb={6} color={'gray.300'} />
      <Heading fontSize={'2.3rem'} fontWeight="bold" mb={2}>
        Oh No! Error 404
      </Heading>
      <Text color={'gray.500'} fontSize="lg" mb={4}>
        Sorry, the page you&apos;re looking for does not exist.
      </Text>
      <Button colorScheme="purple" size="lg" onClick={() => router.push('/')}>
        Go Back Home
      </Button>
    </Box>
  )
}
