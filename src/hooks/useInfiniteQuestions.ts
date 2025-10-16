import { useInfiniteQuery } from '@tanstack/react-query'
import { questionsService } from '../services/questionsService'
import type { QuestionsParams } from '../types/questions'

export const useInfiniteQuestions = (params: Omit<QuestionsParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: ['questions', 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      questionsService.getQuestions({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.currentPage < lastPage.meta.totalPages 
        ? lastPage.meta.currentPage + 1 
        : undefined
    },
    initialPageParam: 1,
  })
}
