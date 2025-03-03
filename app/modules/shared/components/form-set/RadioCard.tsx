import { Box, useRadio } from '@chakra-ui/react'

export function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="30px"
        boxShadow="md"
        _checked={{
          bg: 'purple.600',
          color: 'white',
          borderColor: 'purple.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
