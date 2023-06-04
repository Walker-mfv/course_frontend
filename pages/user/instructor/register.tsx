import { Box, Progress, useColorModeValue, useToast } from '@chakra-ui/react'
import ClientLayout from '@client/ClientLayout'
import ClientPageContainer from '@client/components/ClientPageContainer'
import InstructorTerms from '@client/pages/InstructorForm/InstructorTerms'
import PersonalInformationForm from '@client/pages/InstructorForm/PersonalInformation'
import MyHead from '@shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'
import { LocalRegisterHelper } from 'app/utils/helpers/localStorage.helper'
import React, { useState } from 'react'

const IntructorRegister: NextPageWithLayout = () => {
  const toast = useToast()
  const [step, setStep] = useState(LocalRegisterHelper.getRegisterStep() || 1)
  const [progress, setProgress] = useState(50)
  const bg = useColorModeValue('white', 'transparent')

  return (
    <>
      <MyHead title={AppTitle.INSTRUCTOR_REGISTER} />
      <ClientPageContainer maxW={'container.md'}>
        <Box
          borderWidth="1px"
          borderRadius={'lg'}
          boxShadow={'md'}
          mt={6}
          mb={4}
          pb={10}
          pt={6}
          px={14}
          backgroundColor={bg}
        >
          <Progress hasStripe value={progress} mb={4} mx={4} isAnimated></Progress>
          {step === 1 ? <PersonalInformationForm setStep={setStep} setProgress={setProgress} /> : <InstructorTerms />}
        </Box>
      </ClientPageContainer>
    </>
  )
}

IntructorRegister.getLayout = ClientLayout

export default IntructorRegister
