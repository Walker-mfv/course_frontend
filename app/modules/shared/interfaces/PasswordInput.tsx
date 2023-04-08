import { InputGroup, Input, InputRightElement, InputProps, IconButton, Icon, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export interface PasswordInput extends InputProps {
  iconLeft?: React.ReactNode
}

const PasswordInput = React.forwardRef(({ ...props }: PasswordInput, ref: any) => {
  const { iconLeft, ...inputProps } = props
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      {iconLeft && (
        // eslint-disable-next-line
        <InputLeftElement pointerEvents="none" children={iconLeft} />
      )}
      <Input ref={ref} pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter password" {...inputProps} />
      <InputRightElement>
        <IconButton
          tabIndex={-1}
          onClick={handleClick}
          aria-label=""
          icon={<Icon as={!show ? FiEye : FiEyeOff} />}
          size="sm"
        />
      </InputRightElement>
    </InputGroup>
  )
})
PasswordInput.displayName = 'PasswordInput'
export default PasswordInput
