import { Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useIsClientMobile } from '../../hooks/is-client-mobile.hook'
import DesktopTopBar from './ClientDesktopTopBar'
import ClientMobileTopBar from './ClientMobileTopBar'

const TopBar = () => {
  const bg = useColorModeValue('white', undefined)
  const isMobile = useIsClientMobile()

  return (
    <Stack spacing={0} shadow="0 1px 0 0 rgba(139,141,157,.05), 0 5px 10px 0 rgba(65,71,108,.15)" bg={bg}>
      <Stack py={5} px={4}>
        {!isMobile ? <DesktopTopBar /> : <ClientMobileTopBar />}
      </Stack>
      {/* <Box
        sx={{
          display: 'none',
          '@media only screen and (min-width: 991.98px)': {
            display: 'block',
          },
        }}
      >
        <HorizontalCategoryBar />
      </Box> */}
    </Stack>
  )
}

export default React.memo(TopBar)
