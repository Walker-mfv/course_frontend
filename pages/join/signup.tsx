import AuthBox from 'app/modules/auth/components/AuthBox'
import GoogleLoginButton from 'app/modules/auth/components/LoginGoogleButton'
import SignUpForm from 'app/modules/auth/forms/SignUpForm/SignUpForm'
import { useAuth } from 'app/modules/auth/providers/auth.provider'
import ClientLayout from 'app/modules/client/ClientLayout'
import MyHead from 'app/modules/shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'

const SignUpPage: NextPageWithLayout = () => {
  const {
    state: { user },
  } = useAuth()
  return (
    <>
      <MyHead title={AppTitle.SIGN_UP} />
      <AuthBox
        title="Sign Up and Start Learning!"
        description={`Register now to access a diverse range of courses and start your learning journey today."`}
      >
        <GoogleLoginButton />
        <SignUpForm />
      </AuthBox>
    </>
  )
}
SignUpPage.getLayout = ClientLayout
export default SignUpPage
