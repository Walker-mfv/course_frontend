import update from 'immutability-helper'
import * as lodash from 'lodash'
import md5 from 'md5'
import * as pluralize from 'pluralize'
import slug from 'slug'
import { v4 as uuidv4 } from 'uuid'

export default class Helper {
  static get lodash() {
    return lodash
  }
  static strFormat(str: string, ...args: string[]) {
    const result = args.reduce((prev, current) => {
      return prev.replace('{}', current)
    }, str)
    return result
  }

  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  static get pluralize() {
    return pluralize
  }

  static cvtNumber(value: any, defaultVal: number): number {
    value = Number.parseInt(value)
    value = isNaN(value) ? defaultVal : value
    return value
  }

  static reverseString(val: string): string {
    return val.split(' ').reverse().join(' ')
  }

  static isEmpty(str: string) {
    return !str || str.length === 0
  }

  static cloneObj<T>(obj: T): T {
    const newObjString = JSON.stringify(obj)
    return JSON.parse(newObjString)
  }

  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  static toValidBase64UploadString(base64: string) {
    if (base64) {
      return base64.slice(22)
    }
    return undefined
  }

  static logInfo(...args: any) {
    console.info(...args)
  }

  static extractFileName(fileName: string) {
    const dotIdx = fileName.length - 1 - this.reverseString(fileName).indexOf('.')
    const name = fileName.slice(0, dotIdx)
    const ext = fileName.slice(dotIdx + 1)
    return [name, ext]
  }

  static toSlug(value: string) {
    return slug(value)
  }

  static cvtHtmlToText(value?: string) {
    if (!value) return ''
    return String(value).replace(/(<([^>]+)>)/gi, '')
  }

  static md5(string: string): string {
    return md5(string)
  }

  static genRadomId() {
    return uuidv4()
  }

  static cvtArrayToKV<T>(array: T[], key: string): Record<string, T> {
    return array.reduce((prev, current) => {
      return update(prev, {
        $merge: {
          [(current as any)[key]]: current,
        },
      })
    }, {})
  }

  static mergeByKey<T>(arr1: T[], arr2: T[], key: string) {
    const mergeObj = lodash.merge(lodash.keyBy(arr1, key), lodash.keyBy(arr2, key))
    const mergeddArr = lodash.values(mergeObj)
    return mergeddArr
  }

  static getTextFromHTML(htmlString: string): string {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')
    const text = doc.documentElement.textContent as string
    return text
  }

  static getDateFromTime(time: string, duration: number, date_reminder: Date | undefined): [string, string] {
    const [hours, minutes] = time.split(':')
    const start_date = date_reminder ? new Date(date_reminder) : new Date()
    start_date.setHours(Number(hours))
    start_date.setMinutes(Number(minutes))

    const newTimestamp = start_date.getTime() + duration * 1000
    const end_date = new Date(newTimestamp)
    return [start_date.toISOString(), end_date.toISOString()]
  }

  static formatTimeString(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? (mins === 0 ? `${hours}hr` : `${hours}hr ${mins}min`) : `${mins}min`
  }

  static getDateLocaleString(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      year: 'numeric',
      month: 'short',
    })
  }
}
