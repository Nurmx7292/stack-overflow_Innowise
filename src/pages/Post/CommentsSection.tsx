import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './CommentsSection.module.css'

interface CommentsSectionProps {
  snippetId: number
}

export default function CommentsSection({ snippetId: _snippetId }: CommentsSectionProps) {
  const { user, isAuthenticated } = useAuth()
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<any[]>([])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !isAuthenticated) return

    const comment = {
      id: Date.now(),
      content: newComment.trim(),
      author: user?.username,
      createdAt: new Date().toISOString()
    }

    setComments(prev => [...prev, comment])
    setNewComment('')
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
            />
          </div>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!newComment.trim()}
          >
            <span className={styles.submitIcon}>💬</span>
            Add Comment
          </button>
        </form>
      )}

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <div className={styles.noComments}>
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.author}</span>
                <span className={styles.commentDate}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.commentContent}>
                {comment.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
