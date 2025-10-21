import { api } from '../lib/api'
import type { 
  Answer, 
  CreateAnswerRequest, 
  UpdateAnswerRequest, 
  AnswerState 
} from '../types/questions'

export const answersService = {
  getAnswers: async (): Promise<Answer[]> => {
    const response = await api.get('/api/answers')
    return response.data
  },

  createAnswer: async (data: CreateAnswerRequest): Promise<Answer> => {
    const response = await api.post('/api/answers', data)
    return response.data
  },

  updateAnswer: async (id: string, data: UpdateAnswerRequest): Promise<Answer> => {
    const response = await api.patch(`/api/answers/${id}`, data)
    return response.data
  },

  updateAnswerState: async (id: string, state: AnswerState): Promise<Answer> => {
    const response = await api.put(`/api/answers/${id}/state/${state}`)
    return response.data
  },

  deleteAnswer: async (id: string): Promise<Answer> => {
    const response = await api.delete(`/api/answers/${id}`)
    return response.data
  }
}
