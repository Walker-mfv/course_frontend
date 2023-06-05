import { Badge, BadgeProps } from '@chakra-ui/react'
import { TRoleName } from '@shared/interfaces/models/role.interface'
import Helper from 'app/utils/helpers/helper.helper'
import React from 'react'

interface RoleBadgeProps extends BadgeProps {
  role: TRoleName
}

const data: Record<TRoleName, { color: string }> = {
  Admin: {
    color: 'red',
  },
  Instructor: {
    color: 'purple',
  },
  Manager: {
    color: 'cyan',
  },
  Student: {
    color: 'blue',
  },
}

export default function RoleBadge({ role, ...props }: RoleBadgeProps) {
  const colorScheme = data[role]?.color || 'gray'
  const content = role || Helper.lodash.capitalize(role)
  return (
    <Badge colorScheme={colorScheme} {...props}>
      {content}
    </Badge>
  )
}
