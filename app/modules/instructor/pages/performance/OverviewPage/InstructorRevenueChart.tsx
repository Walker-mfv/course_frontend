import { Button, HStack, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'
import PathHelper from 'app/utils/helpers/path.helper'
import NextLink from '@shared/components/NextLink'
import RevenueChart from 'app/modules/stats-shared/components/Charts/RevenueChart'
import { useMyChart } from 'app/modules/stats-shared/providers/chart-provider'
import { useCourseChartParams } from 'app/modules/stats-shared/providers/course-chart-params.provider'
import { useInstructorRevenueStatsQuery } from 'app/modules/instructor/queries/instructor-revenue-stats-query.hook'

const Main = (props: InstructorRevenueChartProps) => {
  const {
    state: { courseId },
  } = useCourseChartParams()
  const {
    state: { labels, dateRange },
    methods: { standardizedDatasetData },
  } = useMyChart()
  const { isLoading, data: stats } = useInstructorRevenueStatsQuery(dateRange, courseId)
  if (isLoading) return <Skeleton height={'350px'} />
  if (!stats) return <></>
  const data = standardizedDatasetData(stats)
  return (
    <Stack>
      <RevenueChart labels={labels} data={data} />
      <HStack justify={'center'}>
        <NextLink href={PathHelper.getInstructorRevenueReportPath()}>
          <Button colorScheme={'blue'} variant="link">
            View Revenue Reports
          </Button>
        </NextLink>
      </HStack>
    </Stack>
  )
}

export interface InstructorRevenueChartProps {}
export default function InstructorRevenueChart(props: InstructorRevenueChartProps) {
  return <Main {...props} />
}
