import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useCreateComment } from '../../hooks/useComments'
import { useCommentsPolling } from '../../hooks/useCommentsPolling'
import Comment from '../../components/Comment/Comment'
import type { Snippet } from '../../types/snippets'
import styles from './CommentsSection.module.css'

interface CommentsSectionProps {
  snippet: Snippet
}

export default function CommentsSection({ snippet }: CommentsSectionProps) {
  const { isAuthenticated } = useAuth()
  const [newComment, setNewComment] = useState('')
  const [errors, setErrors] = useState<{ content?: string }>({})
  
  const createCommentMutation = useCreateComment()
  
  useCommentsPolling({
    snippetId: parseInt(snippet.id),
    enabled: true,
    interval: 3000,
    pauseOnInactive: true,
    pauseOnScroll: true
  })

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !isAuthenticated) return

    const newErrors: { content?: string } = {}
    
    if (!newComment.trim()) {
      newErrors.content = 'Comment content is required'
    } else if (newComment.trim().length > 1000) {
      newErrors.content = 'Comment must be less than 1000 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      console.log('Creating comment for snippet:', snippet.id, typeof snippet.id)
      await createCommentMutation.mutateAsync({
        content: newComment.trim(),
        snippetId: parseInt(snippet.id)
      })
      
      setNewComment('')
    } catch (error) {
      console.error('Failed to create comment:', error)
    }
  }

  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>Comments</h3>
      
      {!isAuthenticated && (
        <div className={styles.loginPrompt}>
          Please log in to leave comments
        </div>
      )}

      {isAuthenticated && (
        <form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <div className={styles.commentInput}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className={styles.textarea}
              rows={3}
              maxLength={1000}
            />
            {errors.content && (
              <span className={styles.error}>{errors.content}</span>
            )}
          </div>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!newComment.trim() || createCommentMutation.isPending}
          >
            <span className={styles.submitIcon}>💬</span>
            {createCommentMutation.isPending ? 'Adding...' : 'Add Comment'}
          </button>
        </form>
      )}

      <div className={styles.commentsList}>
        {!snippet.comments || snippet.comments.length === 0 ? (
          <div className={styles.noComments}>
            No comments yet. Be the first to comment!
          </div>
        ) : (
          snippet.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  )
}
