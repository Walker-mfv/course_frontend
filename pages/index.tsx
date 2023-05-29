import { Box, Stack } from '@chakra-ui/react'
import ClientLayout from 'app/modules/client/ClientLayout'
import ClientPageContainer from 'app/modules/client/components/ClientPageContainer'
import HighestRatingCoursesGroup from 'app/modules/client/pages/HomePage/HighestRatingCoursesGroup'
import HomeIntro from 'app/modules/client/pages/HomePage/HomeIntro'
import LatestCoursesGroup from 'app/modules/client/pages/HomePage/LatestCoursesGroup'
import MostPopularCoursesGroup from 'app/modules/client/pages/HomePage/MostPopularCoursesGroup'
import MyHead from 'app/modules/shared/components/MyHead'
import { NextPageWithLayout } from 'app/types/next'
import { APP_NAME } from 'app/utils/constants/app.constant'
import React from 'react'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <MyHead title={APP_NAME} ogBasics={{ title: APP_NAME, path: '' }} />
      <Box>
        <HomeIntro />
        <ClientPageContainer px={{ sm: '5px', lg: '12px', xl: 0 }}>
          <Stack spacing={[4, 6]}>
            <LatestCoursesGroup />
            <MostPopularCoursesGroup />
            <HighestRatingCoursesGroup />
          </Stack>
        </ClientPageContainer>
      </Box>
    </>
  )
}
HomePage.getLayout = ClientLayout
export default HomePage
