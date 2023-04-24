import { ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import { AddNewRuleButton } from './AddNewRuleButton'

export const PermissionActions = () => {
  return (
    <ButtonGroup justifyContent="end">
      <AddNewRuleButton />
    </ButtonGroup>
  )
}
