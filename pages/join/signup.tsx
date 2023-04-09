import AuthBox from 'app/modules/auth/components/AuthBox'
import GoogleLoginButton from 'app/modules/auth/components/LoginGoogleButton'
import SignUpForm from 'app/modules/auth/forms/SignUpForm/SignUpForm'
import ClientLayout from 'app/modules/client/ClientLayout'
import MyHead from 'app/modules/shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'
import { useState } from 'react'

const SignUpPage: NextPageWithLayout = () => {
  const [isSubmitted, setSubmited] = useState(false)

  return (
    <>
      <MyHead title={AppTitle.SIGN_UP} />
      <AuthBox
        title="Sign Up and Start Learning!"
        description={`Register now to access a diverse range of courses and start your learning journey today`}
      >
        {!isSubmitted && <GoogleLoginButton />}
        <SignUpForm isSubmitted={isSubmitted} setSubmited={setSubmited} />
      </AuthBox>
    </>
  )
}
SignUpPage.getLayout = ClientLayout
export default SignUpPage
