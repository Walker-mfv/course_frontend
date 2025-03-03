import { Box, Button, ButtonGroup, HStack, Icon, IconButton, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useQuizParams } from '@course-form/providers/quiz-params.provider'
import { useUnitParams } from '@course-form/providers/unit-params.provider'
import { yupResolver } from '@hookform/resolvers/yup'
import SubmitButton from '@shared/components/button-set/SubmitButton'
import MyFormLabel from '@shared/components/form-set/MyFormLabel'
import MyInput from '@shared/components/form-set/MyInput'
import FormErrorBox from '@shared/components/FormErrorBox'
import { useCrudActions } from '@shared/hooks/data/crud-actions.hook'
import { IAnswerOption, IQuestion } from '@shared/interfaces/models/quiz.interface'
import Editor from '@shared/parts/Editor/Editor'
import { addQuizQuestion, updateQuizQuestion } from 'app/store/course/form-course.slice'
import AppIcon from 'app/utils/constants/app-icon.constant'
import FormMsg from 'app/utils/constants/form-message.constant'
import Helper from 'app/utils/helpers/helper.helper'
import React, { useEffect } from 'react'
import {
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import * as yup from 'yup'

interface FormData extends IQuestion {}

const validationSchema = yup.object({
  answerOptions: yup.array().test({
    message: 'Answers ' + FormMsg.minQty({ qty: 2 }),
    test: (values) => {
      const validItems = values?.filter((item) => item?.answerContent?.trim() != '')
      if (validItems && validItems.length >= 2) return true
      return false
    },
  }),
  questionContent: yup.string().required('Question content ' + FormMsg.required),
  correctOptionNo: yup.number().required('Correct option ' + FormMsg.required),
})

const AnswerEditor = (props: {
  index: number
  register: UseFormRegister<FormData>
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
  remove: UseFieldArrayRemove
  canDelete: boolean
}) => {
  const contentPath = `answerOptions.${props.index}.answerContent`
  const descriptionPath = `answerOptions.${props.index}.description`
  return (
    <HStack align={'start'}>
      <Radio value={props.index} />
      <Stack flex={1}>
        <Editor field={contentPath} setValue={props.setValue} watch={props.watch} placeholder="Add an answer" />
        <Box pl={10}>
          <MyInput
            size="sm"
            placeholder="Explain why this is or isn't the best answer"
            field={descriptionPath}
            register={props.register}
            watch={props.watch}
            maxLength={600}
          />
        </Box>
      </Stack>
      <IconButton
        disabled={!props.canDelete}
        variant={'unstyled'}
        onClick={() => props.remove(props.index)}
        aria-label="delete"
        icon={<Icon as={AppIcon.delete} />}
      />
    </HStack>
  )
}

const AddAnswerButton = ({
  watch,
  append,
}: {
  watch: UseFormWatch<FormData>
  append: UseFieldArrayAppend<FormData>
}) => {
  const answerOptionsWatch = watch('answerOptions')
  const canAddAnswer =
    answerOptionsWatch?.filter((item) => Helper.cvtHtmlToText(item.answerContent).trim() == '').length == 0
  const onAdd = () => {
    append({
      answerContent: '',
      description: '',
      optionNo: answerOptionsWatch ? answerOptionsWatch.length - 1 : 0,
    })
  }
  return (
    <Button
      onClick={onAdd}
      disabled={!canAddAnswer}
      colorScheme={'purple'}
      size="sm"
      variant={'link'}
      leftIcon={<Icon as={AppIcon.add} />}
    >
      Answers
    </Button>
  )
}

export interface QuizQuestionForm {}
export default function QuizContentForm(props: QuizQuestionForm) {
  const {
    address,
    methods: { setEditContent },
  } = useUnitParams()
  const {
    state: { quiz, editingQuestion },
    methods: { setEditingQuestion },
  } = useQuizParams()
  const { onXThunkUpdate } = useCrudActions()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'answerOptions', // unique name for your Field Array
  })

  useEffect(() => {
    if (editingQuestion) {
      reset(editingQuestion)
    } else {
      const answerOptions: IAnswerOption[] = [...Array(4)].map((_, i) => {
        return {
          answerContent: '',
          optionNo: i,
          description: '',
        }
      })
      reset({ answerOptions })
    }
  }, [editingQuestion, reset])

  // GEN HTML
  const answersHtml = fields.map((field, index) => {
    return (
      <AnswerEditor
        key={field.id}
        register={register}
        index={index}
        setValue={setValue}
        watch={watch}
        remove={remove}
        canDelete={fields.length > 2}
      />
    )
  })

  // SUBMIT
  const onSubmit = handleSubmit(async (values) => {
    if (editingQuestion) {
      // edit
      await onXThunkUpdate(
        updateQuizQuestion({
          unitAddress: address,
          id: quiz._id,
          questionId: editingQuestion._id,
          data: values,
        })
      )
    } else {
      // add
      await onXThunkUpdate(addQuizQuestion({ unitAddress: address, id: quiz._id, data: values }))
    }
    setEditContent(false)
  })

  const onCancel = () => {
    setEditContent(false)
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={4}>
        <Editor field={'questionContent'} setValue={setValue} label="Question" watch={watch} />
        <Stack spacing={0}>
          <MyFormLabel>Answers</MyFormLabel>
          <RadioGroup
            onChange={(val) => {
              setValue('correctOptionNo', Number.parseInt(val))
            }}
            value={watch('correctOptionNo')}
          >
            <Stack pl={4} spacing={10}>
              {answersHtml}
              <HStack>
                <AddAnswerButton watch={watch} append={append} />
              </HStack>
            </Stack>
          </RadioGroup>
        </Stack>
        <ButtonGroup justifyContent={'end'}>
          <Button onClick={onCancel}>Cancel</Button>
          <SubmitButton />
        </ButtonGroup>
        {/* ERRORS */}
        {Object.keys(errors).length > 0 && <FormErrorBox errors={errors as any} />}
      </Stack>
    </form>
  )
}
