import ClientLayout from '@client/ClientLayout'
import ClientPageContainer from '@client/components/ClientPageContainer'
import UserProfilePage from '@client/pages/UserProfile'
import { useUserInfoQuery } from '@client/queries/user-info'
import MyHead from '@shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'

const UserProfile: NextPageWithLayout = () => {
  const { data: user } = useUserInfoQuery()

  if (!user) {
    return null
  }

  return (
    <>
      <MyHead title={user?.profile?.fullName} />
      <ClientPageContainer maxW={'container.md'}>
        <UserProfilePage user={user} />
      </ClientPageContainer>
    </>
  )
}

UserProfile.getLayout = ClientLayout

export default UserProfile
