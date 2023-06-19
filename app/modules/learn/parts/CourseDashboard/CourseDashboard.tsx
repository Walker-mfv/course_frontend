import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import CalendarEvents from './CalendarEvents'
import UnitComments from './UnitComments'

export default function CourseDashboard() {
  return (
    <Box>
      <Tabs size="lg" ml={10}>
        <TabList>
          <Tab fontWeight={'600'} color={'gray.600'}>
            Comments
          </Tab>
          <Tab fontWeight={'600'} color={'gray.600'}>
            Schedule
          </Tab>
        </TabList>
        <TabPanels mt={4} mb={10} maxW={'container.lg'} mx={'auto'}>
          <TabPanel>
            <UnitComments />
          </TabPanel>
          <TabPanel>
            <CalendarEvents />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
