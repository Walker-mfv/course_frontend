import { Stack, useColorModeValue } from '@chakra-ui/react'
import ClientLayout from 'app/modules/client/ClientLayout'
import ClientPageContainer from 'app/modules/client/components/ClientPageContainer'
import ClientPageHeading from 'app/modules/client/components/ClientPageHeading'
import ProfileForm from 'app/modules/client/pages/ProfilePage/ProfileForm'
import MyHead from 'app/modules/shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'

type Props = {}

const EditProfilePage: NextPageWithLayout = (props: Props) => {
  const bg = useColorModeValue('white', 'transparent')

  return (
    <>
      <MyHead title={AppTitle.EDIT_PROFILE} />
      <ClientPageContainer maxW={'container.md'}>
        <Stack spacing={8} mt={6} mb={4} pb={10} pt={6} px={14} backgroundColor={bg} borderRadius={'lg'}>
          <ClientPageHeading>Your Profile</ClientPageHeading>
          <ProfileForm />
        </Stack>
      </ClientPageContainer>
    </>
  )
}

EditProfilePage.getLayout = ClientLayout

export default EditProfilePage
