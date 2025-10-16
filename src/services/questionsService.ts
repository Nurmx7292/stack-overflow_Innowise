import { api } from '../lib/api'
import type { 
  QuestionsResponse, 
  Question, 
  QuestionsParams, 
  CreateQuestionRequest, 
  UpdateQuestionRequest 
} from '../types/questions'

export const questionsService = {
  getQuestions: async (params: QuestionsParams = {}): Promise<QuestionsResponse> => {
    const response = await api.get('/api/questions', { params })
    return response.data.data
  },

  getQuestion: async (id: string): Promise<Question> => {
    const response = await api.get(`/api/questions/${id}`)
    return response.data
  },

  createQuestion: async (data: CreateQuestionRequest): Promise<Question> => {
    const response = await api.post('/api/questions', data)
    return response.data
  },

  updateQuestion: async (id: string, data: UpdateQuestionRequest): Promise<Question> => {
    const response = await api.patch(`/api/questions/${id}`, data)
    return response.data
  },

  deleteQuestion: async (id: string): Promise<Question> => {
    const response = await api.delete(`/api/questions/${id}`)
    return response.data
  }
}
