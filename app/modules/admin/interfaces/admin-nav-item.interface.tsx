import { TDocumentName } from 'app/utils/constants/role.constant'

export interface IAdminNavItem {
  name?: TDocumentName
  title: string
  link: string
  key: string
}
