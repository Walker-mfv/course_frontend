import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Stack,
  StackDivider,
} from '@chakra-ui/react'
import React from 'react'
import AppIcon from 'app/utils/constants/app-icon.constant'
import PathHelper from 'app/utils/helpers/path.helper'
import ThemeButton from 'app/modules/admin/components/ThemeButton'
import { useAuth } from 'app/modules/auth/providers/auth.provider'
import LogoutButton from 'app/modules/shared/components/button-set/LogoutButton'
import NextLink from 'app/modules/shared/components/NextLink'
import { ProfileTile } from 'app/modules/shared/components/ProfileBox/ProfileTile'
import RoleSwitchButton from 'app/modules/shared/components/button-set/RoleSwitchButton'
import { useBorderColor } from 'app/modules/shared/hooks/style.hook'
import { useSidebar } from 'app/modules/shared/providers/sidebar.provider'
import { AuthButtons } from '../../components/AuthButtons'
import MyCoursesButton from '../../components/MyCoursesButton'
import { ClientMenuProvider, useClientMenu } from '../../providers/client-menu.provider'
import TeachingButton from '../Topbar/TeachingButton'
import SidebarCategory, { SidebarSubCatList } from './SidebarCategory'

const WishlistButton = () => {
  const { onClose } = useSidebar()
  return (
    <NextLink href={PathHelper.getMyCoursesPath('wishlist')}>
      <Button onClick={onClose} variant={'link'} leftIcon={<Icon as={AppIcon.favoriteOutline} />}>
        My wishlist
      </Button>
    </NextLink>
  )
}

const CartButton = () => {
  const { onClose } = useSidebar()
  return (
    <NextLink href={PathHelper.getCartPath()}>
      <Button onClick={onClose} variant={'link'} leftIcon={<Icon as={AppIcon.cart} />}>
        My cart
      </Button>
    </NextLink>
  )
}

const Content = () => {
  const { onClose } = useSidebar()
  const {
    state: { user },
  } = useAuth()
  const borderColor = useBorderColor()
  return (
    <Stack spacing={4} divider={<StackDivider color={borderColor} />}>
      {!user ? (
        <Stack>
          <AuthButtons />
        </Stack>
      ) : (
        <Stack spacing={4}>
          <TeachingButton variant={'link'} justifyContent="start" leftIcon={<Icon as={AppIcon.edit} />} />
          <RoleSwitchButton onClick={onClose} variant={'link'} size="md" />
          <MyCoursesButton onClick={onClose} variant={'link'} leftIcon={<Icon as={AppIcon.course} />} />
          <WishlistButton />
          <CartButton />
        </Stack>
      )}

      <SidebarCategory />
      <Stack>
        <LogoutButton />
      </Stack>
    </Stack>
  )
}

const Main = () => {
  const { onClose, isOpen } = useSidebar()
  const {
    state: { user },
  } = useAuth()
  const {
    state: { hoveredPrimaryCat },
  } = useClientMenu()
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        {!hoveredPrimaryCat ? (
          <>
            {!!user && (
              <DrawerHeader borderBottomWidth="1px">
                <HStack justify={'space-between'}>
                  <ProfileTile />
                  <ThemeButton size="sm" variant={'unstyled'} />
                </HStack>
              </DrawerHeader>
            )}
            <DrawerBody>
              <Content />
            </DrawerBody>
          </>
        ) : (
          <>
            <DrawerBody>
              <SidebarSubCatList />
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default function ClientMobileSidebar() {
  return (
    <ClientMenuProvider>
      <Main />
    </ClientMenuProvider>
  )
}
