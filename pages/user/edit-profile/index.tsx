import { Stack, useColorModeValue } from '@chakra-ui/react'
import ClientPageHeading from '@client/components/ClientPageHeading'
import ClientLayout from 'app/modules/client/ClientLayout'
import ClientPageContainer from 'app/modules/client/components/ClientPageContainer'
import ProfileForm from 'app/modules/client/pages/ProfilePage/ProfileForm'
import MyHead from 'app/modules/shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'

const EditProfilePage: NextPageWithLayout = () => {
  const bg = useColorModeValue('white', 'transparent')

  return (
    <>
      <MyHead title={AppTitle.EDIT_PROFILE} />
      <ClientPageContainer maxW={'container.md'}>
        <Stack
          spacing={8}
          mt={6}
          mb={4}
          pb={10}
          pt={6}
          px={14}
          backgroundColor={bg}
          borderWidth="1px"
          borderRadius={'lg'}
          boxShadow={'md'}
        >
          <ClientPageHeading>Your Profile</ClientPageHeading>
          <ProfileForm />
        </Stack>
      </ClientPageContainer>
    </>
  )
}

EditProfilePage.getLayout = ClientLayout

export default EditProfilePage
