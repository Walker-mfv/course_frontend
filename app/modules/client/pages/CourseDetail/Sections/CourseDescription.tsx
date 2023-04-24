import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Text, Collapse, Box } from '@chakra-ui/react'
import React from 'react'
import ContentCard from '../../../components/ContentCard'
import { useCourseDetailDescription } from '../../../queries/course-detail-query.hook'

function CourseDescription() {
  const [isShow, setShow] = React.useState(false)
  const handleToggle = () => setShow(!isShow)
  const description = useCourseDetailDescription()
  if (!description) return <></>

  return (
    <ContentCard title="Description" border="none" spacing={5}>
      <Box style={{ WebkitMaskImage: isShow ? 'unset' : 'linear-gradient(#ffffff,#ffffff,rgba(255,255,255,0)' }}>
        <Collapse startingHeight={'14rem'} in={isShow}>
          <div className="des-html" dangerouslySetInnerHTML={{ __html: description || '' }}></div>
        </Collapse>
      </Box>
      <Text
        onClick={handleToggle}
        color={'purple.600'}
        fontSize={'sm'}
        fontWeight={'bold'}
        cursor={'pointer'}
        _hover={{ color: 'purple.700' }}
      >
        Show
        {isShow ? (
          <>
            Less <ChevronUpIcon fontSize={'md'} />
          </>
        ) : (
          <>
            More <ChevronDownIcon fontSize={'md'} />
          </>
        )}
      </Text>
    </ContentCard>
  )
}

export default React.memo(CourseDescription)
