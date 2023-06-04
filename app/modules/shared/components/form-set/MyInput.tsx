import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useSubtitleColor } from '../../hooks/style.hook'
import { IMyInput } from '../../interfaces/my-input.interface'
import PasswordInput from '../../interfaces/PasswordInput'
import MyFormLabel from './MyFormLabel'

export default function MyInput({
  type = 'text',
  watch,
  maxLength,
  max,
  min,
  field,
  label,
  placeholder,
  required,
  helperText,
  error,
  autoFocus,
  tabIndex,
  showLabelRow = true,
  accept,
  size = 'md',
  isDisabled,
  register,
  iconLeft,
  onChange,
}: IMyInput) {
  const subColor = useSubtitleColor()
  const value = watch ? watch(field) : undefined
  return (
    <FormControl isInvalid={!!error}>
      {!!showLabelRow ? (
        <MyFormLabel field={field} required={required}>
          {label}
        </MyFormLabel>
      ) : null}
      {type == 'password' ? (
        <PasswordInput
          id={field}
          placeholder={placeholder}
          spellCheck={false}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          isDisabled={isDisabled}
          {...register(field)}
          _placeholder={{ fontSize: '15px' }}
          iconLeft={iconLeft}
        />
      ) : (
        <InputGroup>
          {iconLeft && (
            // eslint-disable-next-line
            <InputLeftElement pointerEvents="none" children={iconLeft} />
          )}
          <Input
            size={size}
            id={field}
            type={type}
            placeholder={placeholder}
            spellCheck={false}
            autoFocus={autoFocus}
            tabIndex={tabIndex}
            maxLength={maxLength}
            max={max}
            min={min}
            accept={accept}
            isDisabled={isDisabled}
            {...register(field)}
            _placeholder={{ fontSize: '15px' }}
            py={1}
            onChange={(e) => {
              register(field).onChange(e)
              onChange && onChange(e)
            }}
          />
          {maxLength && (
            <InputRightElement>
              <Text color={subColor}>{maxLength - (value?.length || 0)}</Text>
            </InputRightElement>
          )}
        </InputGroup>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error?.message && (
        <FormErrorMessage>
          {label} {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}
