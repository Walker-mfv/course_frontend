import CourseFormLayout from '@course-form/CourseFormLayout'
import CourseForm from 'app/modules/admin/pages/courses/CourseForm'
import { NextPageWithLayout } from 'app/types/next'

const Form: NextPageWithLayout = () => {
  return <CourseForm />
}

Form.getLayout = CourseFormLayout
export default Form
