import { Button, ButtonGroup, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchById } from 'app/apis/acp/admin.api'
import FieldLabel from 'app/utils/constants/field-label.constant'
import { SLIDER_dir } from 'app/utils/constants/firebase.constant'
import lan from 'app/utils/constants/lan.constant'
import { USER_STATUS_SELECT_DATA } from 'app/utils/data/user.data'
import Helper from 'app/utils/helpers/helper.helper'
import { sliderVldSchema } from 'app/validations/slider.validation'
import RecImageUpload from 'app/modules/course-form/parts/RecImageUpload'
import MyCircularProgress from 'app/modules/shared/components/MyCircularProgress'
import MyInput from 'app/modules/shared/components/form-set/MyInput'
import MyProgressBar from 'app/modules/shared/components/MyProgress'
import MySelect from 'app/modules/shared/components/form-set/MySelect'
import { useCrudActions } from 'app/modules/shared/hooks/data/crud-actions.hook'
import { useUploadImage } from 'app/modules/shared/hooks/upload-image.hook'
import ISlider, { TSliderStatus } from 'app/modules/shared/interfaces/models/slider.interface'
import { useAppDialog } from '@admin/providers/app-dialog.provider'
import { usePageParams } from '@admin/providers/page-params.provider'

type FormData = {
  _id?: string
  name: string
  status: TSliderStatus
  description?: string
  picture?: string | null
}

export default function SliderForm(props: { id?: string }) {
  const { ctrlName } = usePageParams()

  const { onCreate, onUpdate } = useCrudActions()
  const { onClose } = useAppDialog()

  const [loading, setLoading] = useState<boolean>(true)
  const [isDisable, setDisable] = useState<boolean>(false)
  const [item, setItem] = useState<ISlider>()
  const [initialValues, setInitialValues] = useState<FormData>()
  const { handleUpload, uploadProgress, getImgSrcFuncRef } = useUploadImage(SLIDER_dir, item?.picture)

  // FORM HOOKS
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: yupResolver(sliderVldSchema(initialValues as any)),
  })
  const { errors, isDirty } = formState

  // FORM TYPE
  useEffect(() => {
    if (!!props.id) {
      fetchById<ISlider>('sliders', props.id).then((item) => {
        const values: FormData = {
          _id: item._id,
          name: item.name,
          description: item.description,
          status: item.status,
          picture: item.picture,
        }
        setItem(item)
        setInitialValues(values)
        reset(values)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrlName, props.id])

  // ON SUBMIT
  const onSubmit = handleSubmit(async (values) => {
    setDisable(true)
    handleUpload(async (_, imgSrc) => {
      const data: Partial<ISlider> = {
        name: values.name,
        description: values.description,
        picture: imgSrc,
        status: values.status,
      }
      if (!props.id) {
        await onCreate(data)
        setDisable(false)
        onClose()
      } else {
        const updatedItem = await onUpdate(item!._id, data)
        setDisable(false)
        if (updatedItem) {
          setItem(updatedItem)
          setInitialValues(values)
          reset(values)
        }
      }
    })
  })

  return (
    <>
      {!loading ? (
        <form onSubmit={onSubmit}>
          <VStack align="stretch" spacing={10}>
            <VStack align="stretch" spacing={4}>
              <RecImageUpload
                required
                containerRatio={[3, 2]}
                aspectRatio={3.35}
                label="Silder image"
                getImgSrcFuncRef={getImgSrcFuncRef}
                initialSrc={item?.picture?.toString()}
              />
              <MyInput required field="name" label="Name" register={register} error={errors.name} autoFocus />

              <MyInput field="description" label="Description" register={register} error={errors.description} />

              <MySelect
                required
                placeholder={`${Helper.lodash.upperFirst(lan.SELECT)} ${FieldLabel['user.status']}`}
                field="status"
                label={FieldLabel['user.status']}
                register={register}
                error={errors.status}
                options={USER_STATUS_SELECT_DATA}
              />
              {uploadProgress && <MyProgressBar value={uploadProgress} />}
            </VStack>
            <ButtonGroup justifyContent={'end'}>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme={'blue'} type="submit" disabled={!isDirty || isDisable}>
                Submit
              </Button>
            </ButtonGroup>
          </VStack>
        </form>
      ) : (
        <HStack justify={'center'}>
          <MyCircularProgress />
        </HStack>
      )}
    </>
  )
}
