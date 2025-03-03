import { HamburgerIcon } from '@chakra-ui/icons'
import { HStack, IconButton } from '@chakra-ui/react'
import React from 'react'
import ThemeButton from 'app/modules/admin/components/ThemeButton'
import NotificationButton from 'app/modules/shared/components/NotificationButton/NotificationButton'
import ProfilePopover from 'app/modules/shared/components/ProfileBox/ProfilePopover'
import RoleSwitchButton from 'app/modules/shared/components/button-set/RoleSwitchButton'
import { useSidebar } from 'app/modules/shared/providers/sidebar.provider'
import { useIsInstructorMobile } from '../hooks/is-instructor-mobile.hook'
import { useInstructorParams } from '../providers/instructor-params.provider'

export const INSTRUCTOR_TOP_BAR_HEIGHT = 60
function InstructorTopBar() {
  const { onOpen } = useSidebar()
  const {
    state: { viewMode },
  } = useInstructorParams()
  const isMobile = useIsInstructorMobile()
  return (
    <HStack h={INSTRUCTOR_TOP_BAR_HEIGHT + 'px'} justify="space-between" px={4}>
      <IconButton variant="unstyled" aria-label="Open Menu" icon={<HamburgerIcon />} onClick={onOpen} />
      <HStack justify={'end'}>
        <ThemeButton size="sm" variant="outline" />
        <NotificationButton size="sm" variant="outline" />
        {!viewMode && (
          <>
            <RoleSwitchButton />
            {/* <AuthUserAvatar size="md" /> */}
            <ProfilePopover size={isMobile ? 'sm' : 'md'} context="instructor" />
          </>
        )}
      </HStack>
    </HStack>
  )
}

export default React.memo(InstructorTopBar)
