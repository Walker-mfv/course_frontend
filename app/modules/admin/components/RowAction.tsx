import { Button, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import NextLink from '@shared/components/NextLink'
import IActionItem from '@shared/interfaces/action-item.inteface'

export interface RowActionProps {
  actions: IActionItem[]
}

export default function RowActions({ actions }: RowActionProps) {
  const actionsHtml = actions.map((item) => {
    if (item.path) {
      return (
        <NextLink key={item.name} href={item.path}>
          <MenuItem key={item.name} lineHeight={1} icon={item.icon && <Icon as={item.icon} fontSize={'15px'} />}>
            {item.name}
          </MenuItem>
        </NextLink>
      )
    }
    return (
      <MenuItem
        key={item.name}
        lineHeight={1}
        icon={item.icon && <Icon as={item.icon} fontSize={'15px'} />}
        onClick={item.onClick}
      >
        {item.name}
      </MenuItem>
    )
  })
  return (
    <Menu size={'sm'}>
      <MenuButton as={Button} rightIcon={<Icon as={FiChevronDown} />}>
        Actions
      </MenuButton>
      <MenuList>{actionsHtml}</MenuList>
    </Menu>
  )
}
