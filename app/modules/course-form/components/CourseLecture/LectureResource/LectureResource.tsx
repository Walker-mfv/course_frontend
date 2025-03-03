import { Stack, Button, Icon, Box, Divider, Heading } from '@chakra-ui/react'
import React from 'react'
import AppIcon from 'app/utils/constants/app-icon.constant'
import IFile from '@shared/interfaces/models/file.interface'
import { useLectureParams } from '@course-form/providers/lecture-params.provider'
import { useUnitParams } from '@course-form/providers/unit-params.provider'
import ResourceExcerpt from './ResourceExcerpt'

const ResourceList = () => {
  const {
    state: { lecture },
  } = useLectureParams()
  if (lecture.resources.length == 0) return <></>
  const listHtml = lecture.resources.map((item, i) => {
    return <ResourceExcerpt key={i} file={item as IFile} index={i} />
  })
  return (
    <Stack>
      <Divider />
      <Heading fontSize={'sm'}>Downloadable materials</Heading>
      {listHtml}
    </Stack>
  )
}

export default function LectureResource() {
  const {
    methods: { setEditContent },
  } = useUnitParams()
  const {
    methods: { setContentType },
  } = useLectureParams()
  const onAdd = () => {
    setEditContent(true), setContentType('resource')
  }
  return (
    <Stack spacing={5}>
      <ResourceList />
      <Box>
        <Button onClick={onAdd} size="sm" colorScheme={'blue'} leftIcon={<Icon as={AppIcon.add} />}>
          Resources
        </Button>
      </Box>
    </Stack>
  )
}
