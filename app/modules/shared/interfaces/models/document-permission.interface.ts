import { TDocumentType, TPermission } from 'app/utils/constants/role.constant'
import IModel from './model.interface'

export default interface IDocumentPermission extends IModel {
  type: TDocumentType
  name: string
  permissions: TPermission[]
}
