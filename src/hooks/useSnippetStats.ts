import { useMemo } from 'react'
import { useAuth } from './useAuth'
import type { Snippet } from '../types/snippets'

export const useSnippetStats = (snippet: Snippet) => {
  const { user } = useAuth()

  return useMemo(() => {
    const marks = snippet.marks || []
    const comments = snippet.comments || []
    
    const likesCount = marks.filter(mark => mark.type === 'like').length
    const dislikesCount = marks.filter(mark => mark.type === 'dislike').length
    const commentsCount = comments.length
    
    const userReaction = user 
      ? marks.find(mark => mark.user.id === user.id.toString())?.type || null
      : null

    return {
      likesCount,
      dislikesCount,
      commentsCount,
      userReaction
    }
  }, [snippet, user])
}
