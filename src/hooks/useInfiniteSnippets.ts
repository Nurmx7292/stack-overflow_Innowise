import { useInfiniteQuery } from '@tanstack/react-query'
import { snippetsService } from '../services/snippetsService'
import type { SnippetsParams } from '../types/snippets'

export const useInfiniteSnippets = (params: Omit<SnippetsParams, 'page'> = {} as Omit<SnippetsParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['snippets', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      snippetsService.getSnippets({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.currentPage < lastPage.meta.totalPages 
        ? lastPage.meta.currentPage + 1 
        : undefined
    },
    initialPageParam: 1,
  })
}
