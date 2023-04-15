import { Box, GridItem, HStack, Icon, SimpleGrid, StackProps, Text } from '@chakra-ui/react'
import React from 'react'
import AppIcon from 'app/utils/constants/app-icon.constant'
import ContentCard from 'app/modules/client/components/ContentCard'
import { useCourseDetailObjectives } from 'app/modules/client/queries/course-detail-query.hook'
import { useCardBg } from 'app/modules/shared/hooks/style.hook'

export interface ObjectiveProps extends StackProps {}
export const Objective = ({ children, ...props }: ObjectiveProps) => {
  return (
    <HStack align="start" {...props}>
      <Box mt={'2px'} mr={2}>
        <Icon as={AppIcon.check} />
      </Box>
      <Text flex={1}>{children}</Text>
    </HStack>
  )
}

function CourseObjective() {
  const bgCard = useCardBg()
  const objectives = useCourseDetailObjectives()
  if (objectives?.length == 0) return <></>
  const objectivesHtml = objectives?.map((content, i) => {
    return (
      <GridItem key={i} colSpan={1}>
        <Objective>{content}</Objective>
      </GridItem>
    )
  })

  return (
    <ContentCard title="What you'll learn" bg={bgCard} px={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        {objectivesHtml}
      </SimpleGrid>
    </ContentCard>
  )
}

export default React.memo(CourseObjective)
