import { Stack } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useCallback, useRef } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import MyFormLabel from '../../components/form-set/MyFormLabel'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export interface EditorProps extends ReactQuillProps {
  field: string
  label?: string
  required?: boolean
  watch?: UseFormWatch<any>
  setValue?: UseFormSetValue<any>
}

export default function Editor({
  field,
  label,
  required,
  setValue,
  watch,
  // ref: _,
  ...props
}: EditorProps) {
  const quillRef = useRef(null)

  const setEditorVal = useCallback(
    (val: string) => {
      setValue && setValue(field, val, { shouldDirty: true, shouldValidate: true })
    },
    [field, setValue]
  )

  // const handleRef = useCallback((ref) => {
  //     const quill = ref?.getEditor && ref.getEditor()

  //     // disable spellcheck
  //     quill?.root?.setAttribute('spellcheck', false)

  //     quillRef.current = ref
  // }, [])

  //

  const value = watch ? watch(field) : undefined
  /*
   * Quill modules to attach to editor
   */
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'blockquote', 'code', 'code-block'],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  /*
   * Quill editor formats
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'direction',
    'color',
    'background',
  ]

  return (
    <Stack spacing={1}>
      {label && (
        <MyFormLabel field={field} required={required}>
          {label}
        </MyFormLabel>
      )}
      <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setEditorVal} {...props} />
    </Stack>
  )
}
