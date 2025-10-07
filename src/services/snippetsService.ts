import { api } from '../lib/api'
import type { SnippetsResponse, Snippet, SnippetsParams } from '../types/snippets'

export const snippetsService = {
  getSnippets: async (params: SnippetsParams = {}): Promise<SnippetsResponse> => {
    const response = await api.get('/api/snippets', { params })
    return response.data.data
  },

  getSnippet: async (id: number): Promise<Snippet> => {
    const response = await api.get(`/api/snippets/${id}`)
    return response.data
  },

  getLanguages: async (): Promise<string[]> => {
    const response = await api.get('/api/snippets/languages')
    return response.data
  }
}
