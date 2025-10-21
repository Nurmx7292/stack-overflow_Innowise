import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { questionsService } from '../services/questionsService'
import type { 
  QuestionsParams, 
  UpdateQuestionRequest 
} from '../types/questions'

export const useQuestions = (params: QuestionsParams = {}) => {
  return useQuery({
    queryKey: ['questions', params],
    queryFn: () => questionsService.getQuestions(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => questionsService.getQuestion(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateQuestion = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: questionsService.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
    },
  })
}

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuestionRequest }) =>
      questionsService.updateQuestion(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['question', id] })
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
    },
  })
}

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: questionsService.deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
    },
  })
}
