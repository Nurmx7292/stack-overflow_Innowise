import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsService } from '../services/commentsService'
import { useAuth } from './useAuth'
import type { UpdateCommentRequest } from '../types/comments'

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: commentsService.createComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['snippet', newComment.snippetId] })
      
      const previousSnippet = queryClient.getQueryData(['snippet', newComment.snippetId])
      
      if (previousSnippet && user) {
        const optimisticComment = {
          id: `temp-${Date.now()}`,
          content: newComment.content,
          user: {
            id: user.id.toString(),
            username: user.username,
            role: user.role
          }
        }
        
        queryClient.setQueryData(['snippet', newComment.snippetId], (old: any) => ({
          ...old,
          comments: [...(old.comments || []), optimisticComment]
        }))
      }
      
      return { previousSnippet }
    },
    onError: (_, variables, context) => {
      if (context?.previousSnippet) {
        queryClient.setQueryData(['snippet', variables.snippetId], context.previousSnippet)
      }
    },
    onSuccess: (_, variables) => {
      console.log('Comment created successfully, invalidating cache for snippet:', variables.snippetId)
      queryClient.invalidateQueries({ queryKey: ['snippet', variables.snippetId] })
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCommentRequest }) =>
      commentsService.updateComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippet'] })
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentsService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippet'] })
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}
