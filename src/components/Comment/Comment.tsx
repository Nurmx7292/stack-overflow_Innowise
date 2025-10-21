import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useUpdateComment, useDeleteComment } from '../../hooks/useComments'
import type { Comment as CommentType } from '../../types/snippets'
import styles from './Comment.module.css'

interface CommentProps {
  comment: CommentType
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [errors, setErrors] = useState<{ content?: string }>({})

  const updateCommentMutation = useUpdateComment()
  const deleteCommentMutation = useDeleteComment()

  const isOwner = user?.id.toString() === comment.user.id

  const handleEdit = () => {
    setIsEditing(true)
    setEditContent(comment.content)
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditContent(comment.content)
    setErrors({})
  }

  const handleSave = async () => {
    const newErrors: { content?: string } = {}

    if (!editContent.trim()) {
      newErrors.content = 'Comment content is required'
    } else if (editContent.trim().length < 1) {
      newErrors.content = 'Comment must be at least 1 character'
    } else if (editContent.trim().length > 1000) {
      newErrors.content = 'Comment must be less than 1000 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      await updateCommentMutation.mutateAsync({
        id: comment.id,
        data: { content: editContent.trim() }
      })

      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update comment:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteCommentMutation.mutateAsync(comment.id)
      } catch (error) {
        console.error('Failed to delete comment:', error)
      }
    }
  }

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <span className={styles.commentAuthor}>
          {comment.user.username}
        </span>
        <div className={styles.commentActions}>
          {isOwner && (
            <div className={styles.ownerActions}>
              {!isEditing ? (
                <>
                  <button
                    className={styles.editButton}
                    onClick={handleEdit}
                    disabled={updateCommentMutation.isPending || deleteCommentMutation.isPending}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={updateCommentMutation.isPending || deleteCommentMutation.isPending}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.saveButton}
                    onClick={handleSave}
                    disabled={updateCommentMutation.isPending}
                  >
                    {updateCommentMutation.isPending ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancel}
                    disabled={updateCommentMutation.isPending}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.commentContent}>
        {isEditing ? (
          <div className={styles.editForm}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={styles.editTextarea}
              maxLength={1000}
              rows={3}
            />
            {errors.content && (
              <span className={styles.error}>{errors.content}</span>
            )}
          </div>
        ) : (
          <p>{comment.content}</p>
        )}
      </div>
    </div>
  )
}
