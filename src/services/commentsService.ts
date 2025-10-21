import { api } from '../lib/api'
import type { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types/comments'

export const commentsService = {
  createComment: async (data: CreateCommentRequest): Promise<Comment> => {
    const response = await api.post('/api/comments', data)
    return response.data
  },

  updateComment: async (id: string, data: UpdateCommentRequest): Promise<{ updatedCount: number }> => {
    const response = await api.patch(`/api/comments/${id}`, data)
    return response.data
  },

  deleteComment: async (id: string): Promise<Comment> => {
    const response = await api.delete(`/api/comments/${id}`)
    return response.data
  }
}
