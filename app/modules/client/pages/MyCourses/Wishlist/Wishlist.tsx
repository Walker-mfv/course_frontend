import React, { useCallback, useEffect, useState } from 'react'
import AppTitle from 'app/utils/constants/app-title.constant'
import MyHead from '@shared/components/MyHead'
import ICourse from '@shared/interfaces/models/course.interface'
import { useWishlistQuery } from '@client/queries/wishlist-query.hook'
import MyCourseList from '../MyCourseList'
import WishlistCourseExcerpt from './WishlistCourseExcerpt'
import { fetchRecommendedCourses } from 'app/apis/course/client-course.api'
import { GroupProvider } from '@client/providers/group.provider'
import CourseGroup from '@client/components/CourseGroup/CourseGroup'
import { Box } from '@chakra-ui/react'
const limit = 10

export default function Wishlist() {
  const { isLoading, data: items } = useWishlistQuery()

  const [isLoadingRecommend, setIsLoading] = useState(false)

  const [courses, setCourses] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const ids = items?.map((item) => item._id) || []
    const fetchData = async () => {
      if (ids.length === 0) {
        setIsLoading(false)
        return []
      }
      const response = await fetchRecommendedCourses(ids)
      setCourses(response)
      setIsLoading(false)
    }
    fetchData()
  }, [items])

  const renderItem = useCallback((item: ICourse, i) => {
    return <WishlistCourseExcerpt key={i} item={item} />
  }, [])

  return (
    <>
      <MyHead title={AppTitle.WISHLIST} />
      <MyCourseList isLoading={isLoading} items={items || []} renderItem={renderItem} />
      <Box mt={6}>
        <GroupProvider limit={limit}>
          <CourseGroup isLoading={isLoadingRecommend} title={'Recommended for you'} courses={courses} infinite />
        </GroupProvider>
      </Box>
    </>
  )
}
