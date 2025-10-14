import { api } from '../lib/api'
import type { 
  SnippetsResponse, 
  Snippet, 
  SnippetsParams, 
  CreateSnippetRequest, 
  UpdateSnippetRequest, 
  MarkSnippetRequest, 
  MarkSnippetResponse 
} from '../types/snippets'

export const snippetsService = {
  getSnippets: async (params: SnippetsParams = {}): Promise<SnippetsResponse> => {
    const response = await api.get('/api/snippets', { params })
    return response.data.data
  },

  getSnippet: async (id: number): Promise<Snippet> => {
    const response = await api.get(`/api/snippets/${id}`)
    return response.data
  },

  createSnippet: async (data: CreateSnippetRequest): Promise<Snippet> => {
    const response = await api.post('/api/snippets', data)
    return response.data
  },

  updateSnippet: async (id: number, data: UpdateSnippetRequest): Promise<{ updatedCount: number }> => {
    const response = await api.patch(`/api/snippets/${id}`, data)
    return response.data
  },

  deleteSnippet: async (id: number): Promise<Snippet> => {
    const response = await api.delete(`/api/snippets/${id}`)
    return response.data
  },

  markSnippet: async (id: number, data: MarkSnippetRequest): Promise<MarkSnippetResponse> => {
    const response = await api.post(`/api/snippets/${id}/mark`, data)
    return response.data
  },

  getLanguages: async (): Promise<string[]> => {
    const response = await api.get('/api/snippets/languages')
    return response.data
  }
}
