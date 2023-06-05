import { Icon } from '@chakra-ui/react'
import CustomIconButton from '@shared/components/button-set/CustomIconButton'
import React from 'react'
import { FiSettings } from 'react-icons/fi'
import { useSettingSidebar } from '../providers/setting-sidebar.provider'

export default function SettingSidebarToggler() {
  const { onToggle } = useSettingSidebar()
  return (
    <CustomIconButton
      onClick={onToggle}
      aria-label="menu"
      icon={<Icon fontSize="sm" as={FiSettings} />}
    ></CustomIconButton>
  )
}
