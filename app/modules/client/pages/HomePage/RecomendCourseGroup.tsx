import CourseGroup from '@client/components/CourseGroup/CourseGroup'
import { GroupProvider } from '@client/providers/group.provider'
import { useLearningCourses } from '@client/queries/learning-courses-query.hook'
import { fetchRecommendedCourses } from 'app/apis/course/client-course.api'
import { useEffect, useState } from 'react'
const limit = 10

export function RecommendCourseGroup() {
  const { data: items } = useLearningCourses()
  const [isLoading, setIsLoading] = useState(false)

  const [courses, setCourses] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const ids = items?.map((item) => item.course._id) || []
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

  return (
    <GroupProvider limit={limit}>
      <CourseGroup isLoading={isLoading} title={'Recommended for you'} courses={courses} infinite />
    </GroupProvider>
  )
}
