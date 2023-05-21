import React from 'react'
import CoursePageSection from '../parts/CoursePageSection'
import PromotionForm from '../parts/PromotionForm'

function Promotions() {
  return (
    <CoursePageSection title={'Promotions'}>
      <PromotionForm />
    </CoursePageSection>
  )
}

export default React.memo(Promotions)
