import ICourse from './course.interface'
import IModel from './model.interface'
import IRole from './role.interface'

export interface IProfile {
  lastName: string
  firstName: string
  avatar?: string | null
  phone?: string
  address?: string
  fullName: string
  headline?: string
  biography?: string
}

export interface ICourseList {
  name: string
  Course: ICourse[]
}

export type TMyCourse = 'learning' | 'wishlist' | 'archived'
export interface IMyCourses {
  learning: ICourse[] | string[]
  wishlist: ICourse[] | string[]
  archived: ICourse[]
  lists: ICourseList[]
}

export interface ICart {
  courses: ICourse[]
}

export interface ICalendarEvent {
  id: string
  summary: string
  start_time: string
  end_time: string
  notification_method: string
  notification_time_before?: number
  course_title?: string
  course_url?: string
  sequence: number
  frequency: string
  until?: string
  createdAt: string
}

export type TUserStatus = 'active' | 'inactive' | 'block' | 'unverified'
export interface IUser extends IModel {
  email: string
  status: TUserStatus
  username: string
  password: string
  profile: IProfile
  role: IRole
  providers: string[]
  myCourses: IMyCourses
  cart: ICart
  calendarEvents: ICalendarEvent[]
  createdAt: string
  lastLoggon?: string
  modifiedAt?: string
}
