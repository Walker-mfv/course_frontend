import { Avatar, Box, HStack, Stack, StackDivider, Text } from '@chakra-ui/react'
import { useBorderColor } from '@shared/hooks/style.hook'
import UserCourse from './UserCourse'

const UserProfile = ({ user }: { user: any }) => {
  const { profile, role, countStudents, countReviews, courses } = user
  const borderColor = useBorderColor()

  return (
    <Stack spacing={6} divider={<StackDivider color={borderColor} />}>
      <HStack spacing={16}>
        <Avatar
          name={profile.fullName}
          width={'12rem'}
          src={profile.avatar || ''}
          height={'12rem'}
          border={'5px solid white'}
          boxShadow={'md'}
          size={'2xl'}
        />
        <Box>
          <Text fontSize="4xl" fontWeight={'600'}>
            {profile.fullName}
          </Text>
          <Text color={'gray.500'}>{role.name}</Text>
          {role.name !== 'Student' && (
            <HStack mt={6} spacing={6} fontWeight={500}>
              <Stack spacing={0}>
                <Text fontSize={'0.95rem'}>Total students</Text>
                <Text fontSize={'1.1rem'}>{countStudents}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text fontSize={'0.95rem'}>Reviews</Text>
                <Text fontSize={'1.1rem'}>{countReviews}</Text>
              </Stack>
            </HStack>
          )}
        </Box>
      </HStack>
      {role.name !== 'Student' && <UserCourse courses={courses} />}
    </Stack>
  )
}

export default UserProfile
