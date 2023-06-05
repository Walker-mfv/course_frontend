import { BoxProps, Button, ButtonProps, Heading, HStack, IconButton } from '@chakra-ui/react'
import { useDevice } from '@shared/hooks/app.hook'
import React from 'react'

export interface TableHeaderProps extends BoxProps {
  title: string
  button?: ButtonProps
}

const PageTitle = ({ title, button, children, ...props }: TableHeaderProps) => {
  const { isMobile } = useDevice()
  return (
    <HStack justify="space-between" {...props} mb={{ lg: 4 }}>
      <Heading textAlign={'left'} fontSize={'2xl'}>
        {title}
      </Heading>
      {!!button ? (
        isMobile ? (
          <IconButton colorScheme={button.colorScheme} onClick={button.onClick} aria-label="" icon={button.leftIcon} />
        ) : (
          <Button {...button}>{button.children}</Button>
        )
      ) : null}
    </HStack>
  )
}

export default React.memo(PageTitle)
