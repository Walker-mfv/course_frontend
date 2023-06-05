import { API_DOMAIN, CONTROLLER } from 'app/utils/constants/app.constant'
import axios from 'axios'
import IQuiz from '../modules/shared/interfaces/models/quiz.interface'
import { IQuestion } from './../modules/shared/interfaces/models/quiz.interface'

const prefix = `${API_DOMAIN}/${CONTROLLER.quiz}`

export async function apiUpdateQuiz(id: string, data: Partial<IQuiz>): Promise<IQuiz> {
  return axios.patch(`${prefix}/${id}`, data).then((res) => res.data)
}

export async function apiAddQuizQuestion(id: string, data: Partial<IQuestion>): Promise<IQuestion> {
  return axios.patch(`${prefix}/add-question/${id}`, data).then((res) => res.data)
}

export async function apiUpdateQuizQuestion(
  id: string,
  questionId: string,
  data: Partial<IQuestion>
): Promise<IQuestion> {
  return axios.patch(`${prefix}/update-question/${id}/${questionId}`, data).then((res) => res.data)
}

export async function apiDeleteQuizQuestion(id: string, questionId: string): Promise<IQuestion> {
  return axios.patch(`${prefix}/delete-question/${id}/${questionId}`).then((res) => res.data)
}

// export function apiUpdateVideo(id: string, data: Partial<IFile>): Promise<IFile> {
//     return axios.patch(`${prefix}/update-video/${id}`, data).then(res => res.data)
// }
