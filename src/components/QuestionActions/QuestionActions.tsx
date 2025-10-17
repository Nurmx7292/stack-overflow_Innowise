import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useUpdateQuestion, useDeleteQuestion } from '../../hooks/useQuestions'
import type { Question } from '../../types/questions'
import styles from './QuestionActions.module.css'

interface QuestionActionsProps {
  question: Question
  onEdit?: () => void
}

export default function QuestionActions({ question, onEdit }: QuestionActionsProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: question.title,
    description: question.description,
    attachedCode: question.attachedCode || ''
  })
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})
  
  const updateQuestionMutation = useUpdateQuestion()
  const deleteQuestionMutation = useDeleteQuestion()
  
  const isOwner = user?.id.toString() === question.user.id

  if (!isOwner) {
    return null
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({
      title: question.title,
      description: question.description,
      attachedCode: question.attachedCode || ''
    })
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      title: question.title,
      description: question.description,
      attachedCode: question.attachedCode || ''
    })
    setErrors({})
  }

  const handleSave = async () => {
    const newErrors: { title?: string; description?: string } = {}
    
    if (!editData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (editData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters'
    } else if (editData.title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters'
    }
    
    if (!editData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (editData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    } else if (editData.description.trim().length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    
    try {
      await updateQuestionMutation.mutateAsync({
        id: question.id,
        data: {
          title: editData.title.trim(),
          description: editData.description.trim(),
          attachedCode: editData.attachedCode.trim() || undefined
        }
      })
      
      setIsEditing(false)
      onEdit?.()
    } catch (error) {
      console.error('Failed to update question:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      try {
        await deleteQuestionMutation.mutateAsync(question.id)
      } catch (error) {
        console.error('Failed to delete question:', error)
      }
    }
  }

  if (isEditing) {
    return (
      <div className={styles.editForm}>
        <div className={styles.field}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            className={styles.input}
            maxLength={200}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
            className={styles.textarea}
            maxLength={1000}
            rows={4}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Attached Code (optional):</label>
          <textarea
            value={editData.attachedCode}
            onChange={(e) => setEditData(prev => ({ ...prev, attachedCode: e.target.value }))}
            className={styles.textarea}
            rows={6}
            placeholder="Enter code here..."
          />
        </div>

        <div className={styles.editActions}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={updateQuestionMutation.isPending}
          >
            {updateQuestionMutation.isPending ? 'Saving...' : 'Save'}
          </button>
          <button
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={updateQuestionMutation.isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.actions}>
      <button
        className={styles.editButton}
        onClick={handleEdit}
        disabled={updateQuestionMutation.isPending || deleteQuestionMutation.isPending}
      >
        Edit
      </button>
      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        disabled={updateQuestionMutation.isPending || deleteQuestionMutation.isPending}
      >
        Delete
      </button>
    </div>
  )
}



