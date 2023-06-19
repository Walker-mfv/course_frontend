import { Box, Button, Heading, Text } from '@chakra-ui/react'
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
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        401
      </Heading>
      <Text fontSize="1.2rem" fontWeight={500} mt={3} mb={2}>
        Access denied
      </Text>
      <Text color={'gray.500'} mb={6}>
        You don&apos;t have permissions to access this page.
      </Text>
      <Button
        colorScheme="purple"
        size="lg"
        bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
        variant="solid"
        onClick={() => router.push('/')}
      >
        Go Back Home
      </Button>
    </Box>
  )
}
