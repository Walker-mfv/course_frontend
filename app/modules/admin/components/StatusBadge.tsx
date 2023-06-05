import { Badge, BadgeProps } from '@chakra-ui/react'
import { TColorScheme } from '@shared/types/color-scheme.type'
import Helper from 'app/utils/helpers/helper.helper'
import React from 'react'

export type TStatus =
  | 'active'
  | 'inactive'
  | 'block'
  | 'pending'
  | 'rejected'
  | 'draft'
  | 'success'
  | 'processing'
  | 'paid'
  | 'unverified'

const data: Record<
  TStatus,
  {
    color: TColorScheme
    content: string
  }
> = {
  active: {
    color: 'green',
    content: 'Active',
  },
  inactive: {
    color: 'yellow',
    content: 'Inactive',
  },
  unverified: {
    color: 'gray',
    content: 'Unverified',
  },
  pending: {
    color: 'yellow',
    content: 'Pending',
  },
  rejected: {
    color: 'yellow',
    content: 'Rejected',
  },
  draft: {
    color: 'gray',
    content: 'Draft',
  },
  block: {
    color: 'red',
    content: 'Block',
  },
  success: {
    color: 'green',
    content: 'Success',
  },
  processing: {
    color: 'yellow',
    content: 'Processing',
  },
  paid: {
    color: 'blue',
    content: 'Paid',
  },
}

interface StatusBadgeProps extends BadgeProps {
  status: TStatus
  label?: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const colorScheme = data[status]?.color || 'gray'
  const content = !label ? data[status]?.content || Helper.lodash.capitalize(status) : label
  return <Badge colorScheme={colorScheme}>{content}</Badge>
}
