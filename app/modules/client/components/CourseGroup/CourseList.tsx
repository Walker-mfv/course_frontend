import { Box } from '@chakra-ui/react'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import React from 'react'
import Carousel, { ResponsiveType } from 'react-multi-carousel'
import { useCourseGroup } from '../../providers/group.provider'
import HomeCourseExcerpt from './HomeCourseExcerpt'

const responsive: ResponsiveType = {
  xl: {
    breakpoint: { max: 3000, min: 1280 },
    items: 5,
    slidesToSlide: 5,
  },
  lg: {
    breakpoint: { max: 1279, min: 768 },
    items: 4,
    slidesToSlide: 4,
  },
  md: {
    breakpoint: { max: 767, min: 640 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 10,
  },
  sm: {
    breakpoint: { max: 639, min: 400 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 20,
  },
  base: {
    breakpoint: { max: 399, min: 0 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 10,
  },
}

export interface CourseListProps {
  courses: ICourse[]
  infinite?: boolean
}

const CourseList = (props: CourseListProps) => {
  const {
    methods: { onBeforeChange },
  } = useCourseGroup()

  const courseExcerptsHtml = props.courses.map((item, i) => {
    return (
      <Box key={i} px={2} draggable={false} height={'full'}>
        <HomeCourseExcerpt course={item} />
      </Box>
    )
  })

  return (
    <Carousel
      className="course-group-carousel"
      beforeChange={onBeforeChange}
      draggable={false}
      responsive={responsive}
      shouldResetAutoplay={false}
      partialVisible={true}
      infinite={props.infinite}
    >
      {courseExcerptsHtml}
    </Carousel>
  )
}

export default React.memo(CourseList)
