import { HStack } from '@chakra-ui/react'
import ThemeButton from 'app/modules/admin/components/ThemeButton'
import { useAuth } from 'app/modules/auth/providers/auth.provider'
import AvatarSkeleton from 'app/modules/shared/components/AvatarSkeleton'
import RoleSwitchButton from 'app/modules/shared/components/button-set/RoleSwitchButton'
import NotificationButton from 'app/modules/shared/components/NotificationButton/NotificationButton'
import ProfilePopover from 'app/modules/shared/components/ProfileBox/ProfilePopover'
import React from 'react'
import AppHeading from '../../components/AppHeading'
import { AuthButtons } from '../../components/AuthButtons'
import CartButton from '../../components/CartButton'
import MyCoursesButton from '../../components/MyCoursesButton'
import SearchBar from '../../components/SearchBar/SearchBar'
import WishlistButton from '../../components/WishlistButton'
import PopoverCategory from './PopoverCategory'
import TeachingButton from './TeachingButton'

const UserButtons = () => {
  const {
    state: { user },
  } = useAuth()
  if (!user) return <></>
  return (
    <>
      <TeachingButton />
      <MyCoursesButton />
      <WishlistButton />
    </>
  )
}

const Profile = () => {
  const {
    state: { user },
  } = useAuth()
  return (
    <>
      {!!user ? (
        <ProfilePopover size="md" />
      ) : typeof user == 'undefined' ? (
        <AvatarSkeleton />
      ) : (
        <HStack>
          <AuthButtons />
        </HStack>
      )}
    </>
  )
}

function DesktopTopBar() {
  return (
    <HStack spacing={2} justify="space-between">
      <HStack spacing={4} pr={4}>
        <AppHeading />
        <PopoverCategory />
      </HStack>
      <SearchBar />
      <HStack spacing={2}>
        <UserButtons />
        <CartButton />
        <ThemeButton px={2} variant={'ghost'} />
        <NotificationButton px={2} variant={'ghost'} />
        <RoleSwitchButton />
        <Profile />
      </HStack>
    </HStack>
  )
}

export default React.memo(DesktopTopBar)
