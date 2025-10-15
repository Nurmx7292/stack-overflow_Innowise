import { useMemo } from 'react'
import { useAuth } from './useAuth'
import type { Snippet } from '../types/snippets'

export const useSnippetStats = (snippet: Snippet) => {
  const { user } = useAuth()

  return useMemo(() => {
    const likesCount = snippet.marks.filter(mark => mark.type === 'like').length
    const dislikesCount = snippet.marks.filter(mark => mark.type === 'dislike').length
    const commentsCount = snippet.comments.length
    
    const userReaction = user 
      ? snippet.marks.find(mark => mark.user.id === user.id.toString())?.type || null
      : null

    return {
      likesCount,
      dislikesCount,
      commentsCount,
      userReaction
    }
  }, [snippet, user])
}
