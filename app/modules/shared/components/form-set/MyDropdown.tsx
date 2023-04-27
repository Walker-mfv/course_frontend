import {
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { useActiveColor } from '@client/hooks/style.hook'
import { useBorderColor } from '../../hooks/style.hook'
import { IMyDropDownItem } from '../../interfaces/dropdown-item.interface'
import NextLink from '../NextLink'
import { ProfileTile } from '../ProfileBox/ProfileTile'

export interface IMyDropdownItemGroup {
  label: string
  list: IMyDropDownItem[]
}

const ListItem = (props: IMyDropDownItem) => {
  const activeColor = useActiveColor()
  return (
    <HStack
      py={2}
      sx={{
        '&:hover': {
          color: activeColor,
        },
        '&:hover svg': {
          color: activeColor,
        },
      }}
    >
      <Text color={'#aaaaaa'} minWidth={'1.1rem'}>
        {props.icon}
      </Text>
      <Text h="full" w="full">
        {props.label}
      </Text>
    </HStack>
  )
}

const ListGroup = (props: IMyDropdownItemGroup) => {
  const listItemsHtml = props.list.map((item, i) => (
    <Box key={i}>
      {item.path ? (
        <NextLink href={item.path}>
          <ListItem {...item} />
        </NextLink>
      ) : (
        <Box
          onClick={item.onClick}
          sx={{
            cursor: item.onClick ? 'pointer' : undefined,
          }}
        >
          <ListItem {...item} />
        </Box>
      )}
    </Box>
  ))
  return <Stack spacing={0}>{listItemsHtml}</Stack>
}

const Content = (props: { listGroups: IMyDropdownItemGroup[] }) => {
  const borderColor = useBorderColor()
  const listGroupsHtml = props.listGroups.map((item, i) => {
    return <ListGroup key={i} label={item.label} list={item.list} />
  })
  return <Stack divider={<StackDivider color={borderColor} />}>{listGroupsHtml}</Stack>
}

export interface DropDownProps {
  trigger: ReactNode
  listGroups: IMyDropdownItemGroup[]
}

function MyDropdown(props: DropDownProps) {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>{props.trigger}</PopoverTrigger>
      <PopoverContent border={'none'} shadow="lg" p={4} maxW="300px">
        <PopoverArrow />
        <PopoverHeader mb={2} pb={5}>
          <ProfileTile />
        </PopoverHeader>
        <PopoverBody>
          <Content listGroups={props.listGroups} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default React.memo(MyDropdown)
