import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useUpdateAnswer, useDeleteAnswer } from '../../hooks/useAnswers'
import type { Answer as AnswerType } from '../../types/questions'
import styles from './Answer.module.css'

interface AnswerProps {
  answer: AnswerType
}

export default function Answer({ answer }: AnswerProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(answer.content)
  const [errors, setErrors] = useState<{ content?: string }>({})
  
  const updateAnswerMutation = useUpdateAnswer()
  const deleteAnswerMutation = useDeleteAnswer()
  
  const isOwner = user?.id.toString() === answer.user.id

  const handleEdit = () => {
    setIsEditing(true)
    setEditContent(answer.content)
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditContent(answer.content)
    setErrors({})
  }

  const handleSave = async () => {
    const newErrors: { content?: string } = {}
    
    if (!editContent.trim()) {
      newErrors.content = 'Answer content is required'
    } else if (editContent.trim().length < 10) {
      newErrors.content = 'Answer must be at least 10 characters'
    } else if (editContent.trim().length > 1000) {
      newErrors.content = 'Answer must be less than 1000 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    
    try {
      await updateAnswerMutation.mutateAsync({
        id: answer.id,
        data: { content: editContent.trim() }
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update answer:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this answer?')) {
      try {
        await deleteAnswerMutation.mutateAsync(answer.id)
      } catch (error) {
        console.error('Failed to delete answer:', error)
      }
    }
  }

  return (
    <div className={styles.answerItem}>
      <div className={styles.answerHeader}>
        <span className={styles.answerAuthor}>
          {answer.user.username}
        </span>
        <div className={styles.answerActions}>
          {answer.isCorrect && (
            <span className={styles.correctAnswer}>✅ Correct Answer</span>
          )}
          {isOwner && (
            <div className={styles.ownerActions}>
              {!isEditing ? (
                <>
                  <button 
                    className={styles.editButton}
                    onClick={handleEdit}
                    disabled={updateAnswerMutation.isPending || deleteAnswerMutation.isPending}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={updateAnswerMutation.isPending || deleteAnswerMutation.isPending}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className={styles.saveButton}
                    onClick={handleSave}
                    disabled={updateAnswerMutation.isPending}
                  >
                    {updateAnswerMutation.isPending ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    className={styles.cancelButton}
                    onClick={handleCancel}
                    disabled={updateAnswerMutation.isPending}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.answerContent}>
        {isEditing ? (
          <div className={styles.editForm}>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={styles.editTextarea}
              maxLength={1000}
              rows={4}
            />
            {errors.content && (
              <span className={styles.error}>{errors.content}</span>
            )}
          </div>
        ) : (
          <p>{answer.content}</p>
        )}
      </div>
    </div>
  )
}
