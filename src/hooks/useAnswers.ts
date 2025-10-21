import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { answersService } from '../services/answersService'
import type { 
  UpdateAnswerRequest, 
  AnswerState 
} from '../types/questions'

export const useAnswers = () => {
  return useQuery({
    queryKey: ['answers'],
    queryFn: answersService.getAnswers,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateAnswer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: answersService.createAnswer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['answers'] })
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['question', variables.questionId] })
    },
  })
}

export const useUpdateAnswer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnswerRequest }) =>
      answersService.updateAnswer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] })
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['question'] })
    },
  })
}

export const useUpdateAnswerState = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, state }: { id: string; state: AnswerState }) =>
      answersService.updateAnswerState(id, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] })
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
    },
  })
}

export const useDeleteAnswer = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: answersService.deleteAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] })
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      queryClient.invalidateQueries({ queryKey: ['questions', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['question'] })
    },
  })
}
