import { axiosApiInstance } from 'app/utils/axios-utils'
import { IRolePermission } from '../modules/shared/interfaces/models/role.interface'
import { TPermission } from './../utils/constants/role.constant'

const prefix = `roles/permission`

export async function fetchRolePermissions(roleId: string, documentPermissionId?: string): Promise<IRolePermission[]> {
  const queryString = documentPermissionId ? `documentPermissionId=${documentPermissionId}` : ''
  return axiosApiInstance.get<IRolePermission[]>(`${prefix}/${roleId}?${queryString}`).then((res) => res.data)
}

export async function updateRolePermission(
  roleId: string,
  documentPermissionId: string,
  data: {
    enabledPermissions?: TPermission[]
    onlyForCreator?: boolean
  }
): Promise<boolean> {
  return axiosApiInstance
    .patch<boolean>(`${prefix}/update-permission/${roleId}/${documentPermissionId}`, data)
    .then((res) => res.data)
}

export async function addRolePermission(roleId: string, documentPermissionId: string): Promise<IRolePermission[]> {
  return axiosApiInstance
    .patch(`${prefix}/add-permission/${roleId}`, {
      documentPermission: documentPermissionId,
    })
    .then((res) => res.data)
}

export async function deleteRolePermission(roleId: string, documentPermissionId: string): Promise<boolean> {
  return axiosApiInstance.patch(`${prefix}/delete-permission/${roleId}/${documentPermissionId}`).then((res) => res.data)
}
