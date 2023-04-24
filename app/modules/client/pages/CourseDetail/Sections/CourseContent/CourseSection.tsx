import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import DateHelper from 'app/utils/helpers/date.helper'
import { useBorderColor } from 'app/modules/shared/hooks/style.hook'
import { useCourseDetailSection, useCourseDetailSectionDuration } from '@client/queries/course-detail-query.hook'
import CourseUnit from './CourseUnit'

export interface CourseSectionProps {
  sIdx: number
}

function CourseSection(props: CourseSectionProps) {
  const borderColor = useBorderColor()
  const section = useCourseDetailSection(props.sIdx)
  const sectionDuration = useCourseDetailSectionDuration(props.sIdx)
  const unitsHtml = useMemo(() => {
    return section?.units.map((unit, i) => {
      return <CourseUnit key={unit._id} sIdx={props.sIdx} uIdx={i} />
    })
  }, [props.sIdx, section?.units])
  const sectionBg = useColorModeValue('gray.100', 'gray.700')

  const sectionHoverBg = useColorModeValue('gray.200', 'gray.600')
  return (
    <AccordionItem border={'none'}>
      <AccordionButton
        mb={1.5}
        mt={3}
        border={'1px solid'}
        bgColor={'rgba(146, 164, 183, 0.05)'}
        borderColor={borderColor}
        borderRadius={'lg'}
        className="no-focus-shadow"
        py={4}
        sx={{
          '&:hover': {
            bgColor: sectionHoverBg,
          },
        }}
      >
        <HStack w="100%" pl={4}>
          <AccordionIcon />
          <Text as="strong" flex={1} textAlign="left">
            {section?.title}
          </Text>
          <HStack fontSize={'sm'}>
            {/* <Text>{section?.units.length}</Text>
            <Text>-</Text> */}
            {!!sectionDuration && <Text>{DateHelper.getRoundMinute(sectionDuration)} min</Text>}
          </HStack>
        </HStack>
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <Stack spacing={2}>{unitsHtml}</Stack>
        </Accordion>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default React.memo(CourseSection)
