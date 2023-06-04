import { Avatar, Box, HStack, Stack, StackDivider, Text } from '@chakra-ui/react'
import { useBorderColor } from '@shared/hooks/style.hook'
import UserCourse from './UserCourse'

const UserProfile = ({ user }: { user: any }) => {
  const { profile, role, countStudents, countReviews, courses } = user
  const borderColor = useBorderColor()

  return (
    <Stack spacing={6} divider={<StackDivider color={borderColor} />}>
      <HStack spacing={14}>
        <Avatar
          name={profile.fullName}
          width={'11rem'}
          height={'11rem'}
          src={profile.avatar || ''}
          border={'5px solid white'}
          boxShadow={'md'}
          size={'2xl'}
        />
        <Box>
          <Text fontSize="4xl" fontWeight={'600'}>
            {profile.fullName}
          </Text>
          <Text color={'gray.500'}>{[profile.headline]}</Text>
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
      {role.name !== 'Student' && (
        <Stack spacing={4}>
          <Text fontWeight={600} fontSize={'2xl'}>
            About me
          </Text>
          <div
            className="des-html"
            dangerouslySetInnerHTML={{ __html: profile.biography || '' }}
            style={{ lineHeight: 1.6 }}
          ></div>
        </Stack>
      )}
      {role.name !== 'Student' && <UserCourse courses={courses} />}
    </Stack>
  )
}

export default UserProfile
