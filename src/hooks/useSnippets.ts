import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { snippetsService } from '../services/snippetsService'
import type { 
  SnippetsParams, 
  UpdateSnippetRequest, 
  MarkSnippetRequest 
} from '../types/snippets'

export const useSnippets = (params: SnippetsParams = {}) => {
  return useQuery({
    queryKey: ['snippets', params],
    queryFn: () => snippetsService.getSnippets(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useSnippet = (id: number) => {
  return useQuery({
    queryKey: ['snippet', id],
    queryFn: () => snippetsService.getSnippet(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: snippetsService.getLanguages,
    staleTime: 30 * 60 * 1000,
  })
}

export const useCreateSnippet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: snippetsService.createSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}

export const useUpdateSnippet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSnippetRequest }) =>
      snippetsService.updateSnippet(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['snippet', id] })
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}

export const useDeleteSnippet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: snippetsService.deleteSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}

export const useMarkSnippet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MarkSnippetRequest }) =>
      snippetsService.markSnippet(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['snippet', id] })
      queryClient.invalidateQueries({ queryKey: ['snippets'] })
      queryClient.invalidateQueries({ queryKey: ['snippets', 'infinite'] })
    },
  })
}
