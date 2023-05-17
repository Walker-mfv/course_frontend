import { LockIcon } from '@chakra-ui/icons'
import { Box, Heading, Text, Button, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCardBg } from '../hooks/style.hook'

export function Unauthorized() {
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
      <Icon as={LockIcon} w={16} h={16} mb={6} color={'gray.300'} />
      <Heading fontSize={'2.3rem'} fontWeight="bold" mb={2}>
        Access denied
      </Heading>
      <Text color={'gray.500'} fontSize="lg" mb={4}>
        You don&apos;t have permissions to access this page.
      </Text>
      <Button colorScheme="purple" size="lg" onClick={() => router.push('/')}>
        Go Back Home
      </Button>
    </Box>
  )
}
