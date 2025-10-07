import { useQuery } from '@tanstack/react-query'
import { snippetsService } from '../services/snippetsService'
import type { SnippetsParams } from '../types/snippets'

export const useSnippets = (params: SnippetsParams = {}) => {
  return useQuery({
    queryKey: ['snippets', params],
    queryFn: () => snippetsService.getSnippets(params)
  })
}

export const useSnippet = (id: number) => {
  return useQuery({
    queryKey: ['snippet', id],
    queryFn: () => snippetsService.getSnippet(id),
    enabled: !!id
  })
}

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: snippetsService.getLanguages
  })
}
