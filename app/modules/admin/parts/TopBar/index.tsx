import { BoxProps, HStack } from '@chakra-ui/react'
import React from 'react'
import NotificationButton from 'app/modules/shared/components/NotificationButton/NotificationButton'
import ProfilePopover from 'app/modules/shared/components/ProfileBox/ProfilePopover'
import RoleSwitchButton from 'app/modules/shared/components/button-set/RoleSwitchButton'
import { useDevice } from 'app/modules/shared/hooks/app.hook'
import { useTop } from 'app/modules/shared/hooks/on-top-hook'
import { useAppBg } from 'app/modules/shared/hooks/style.hook'
import AdminSidebarToggler from '../../components/AdminSidebarToggler'
import ThemeButton from '../../components/ThemeButton'

export default function TopBar({ ...props }: BoxProps) {
  const isTop = useTop()
  const { isMobile } = useDevice()
  const bg = useAppBg()
  return (
    <HStack
      transitionProperty={'background-color'}
      transitionDuration="normal"
      bgColor={bg}
      h={14}
      justify={'space-between'}
      shadow={!isTop ? 'lg' : 'none'}
      {...props}
    >
      <HStack>
        {isMobile ? (
          <>
            <AdminSidebarToggler />
          </>
        ) : null}
        {/* <AdminBreadcrumb /> */}
      </HStack>
      <HStack pt={2}>
        {/* <SettingSidebarToggler /> */}
        <ThemeButton size="sm" />
        <NotificationButton size="sm" />
        <RoleSwitchButton />
        <ProfilePopover size={isMobile ? 'sm' : 'md'} context="admin" />
      </HStack>
    </HStack>
  )
}
