import { Avatar, AvatarProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import PathHelper from 'app/utils/helpers/path.helper'
import { useAuth } from '@auth/providers/auth.provider'
import { TModule } from '../../types/module.type'
import MyDropdown, { IMyDropdownItemGroup } from '../form-set/MyDropdown'
import AppIcon from 'app/utils/constants/app-icon.constant'

export interface ProfilePopoverProps extends AvatarProps {
  context?: TModule
  postLogout?: () => void
}
function ProfilePopover({ postLogout, context = 'client', ...props }: ProfilePopoverProps) {
  const {
    state: { user },
    methods: { onLogout },
  } = useAuth()
  const listGroups: IMyDropdownItemGroup[] = useMemo(() => {
    let groups: IMyDropdownItemGroup[] = [
      {
        label: 'profile',
        list: [
          {
            label: 'Profile',
            path: PathHelper.getProfliePath(),
            icon: <AppIcon.userBi fontSize={'1.2rem'} />,
          },
          {
            label: 'Logout',
            onClick: () => {
              onLogout()
              // postLogout && postLogout()
              // window.location.reload()
            },
            icon: <AppIcon.logout fontSize={'1rem'} />,
          },
        ],
      },
    ]
    if (context == 'client') {
      const clientGroups: IMyDropdownItemGroup[] = [
        {
          label: 'learning',
          list: [
            {
              label: 'My learning',
              path: PathHelper.getMyCoursesPath('learning'),
              icon: <AppIcon.course fontSize={'1rem'} />,
            },
            {
              label: 'My cart',
              path: PathHelper.getCartPath(),
              icon: <AppIcon.cart fontSize={'1rem'} />,
            },
            {
              label: 'Wishlist',
              path: PathHelper.getMyCoursesPath('wishlist'),
              icon: <AppIcon.withlist fontSize={'1.1rem'} />,
            },
          ],
        },
      ]
      groups = clientGroups.concat(groups)
    }
    return groups
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLogout, postLogout])
  const trigger = useMemo(() => {
    if (!user) return <></>
    return (
      <Avatar ignoreFallback sx={{ cursor: 'pointer' }} src={user.profile.avatar || ''} size={'sm'} {...props}></Avatar>
    )
  }, [props, user])
  if (!user) return <></>
  return <MyDropdown trigger={trigger} listGroups={listGroups} />
}

export default React.memo(ProfilePopover)
