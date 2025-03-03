import * as yup from 'yup'
import { apiCheckUnique } from 'app/apis/acp/admin.api'
import FormMsg from 'app/utils/constants/form-message.constant'
import { CONTROLLER } from 'app/utils/constants/app.constant'
import IRole from '../modules/shared/interfaces/models/role.interface'

export const roleVldSchema = (initialValue?: Partial<IRole>) => {
  return yup
    .object({
      _id: yup.string().nullable(),
      name: yup
        .string()
        .required(FormMsg.required)
        .test('checkDupName', FormMsg.unique, async function (value) {
          const valid = yup.string().validateSync(value)
          if (!valid || value == initialValue?.name) return true
          const result = await apiCheckUnique(CONTROLLER.role, 'name', value!)
          return !result
        }),
      ordering: yup.number().required(FormMsg.required),
      status: yup.string().required(FormMsg.required),
      description: yup.string().nullable(),
    })
    .required()
}
