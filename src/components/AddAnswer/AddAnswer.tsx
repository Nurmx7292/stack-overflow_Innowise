import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useCreateAnswer } from '../../hooks/useAnswers'
import styles from './AddAnswer.module.css'

interface AddAnswerProps {
  questionId: string
}

export default function AddAnswer({ questionId }: AddAnswerProps) {
  const { user, isAuthenticated } = useAuth()
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState<{ content?: string }>({})
  
  const createAnswerMutation = useCreateAnswer()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated || !user) {
      setErrors({ content: 'You must be logged in to answer' })
      return
    }
    
    const newErrors: { content?: string } = {}
    
    if (!content.trim()) {
      newErrors.content = 'Answer content is required'
    } else if (content.trim().length < 10) {
      newErrors.content = 'Answer must be at least 10 characters'
    } else if (content.trim().length > 1000) {
      newErrors.content = 'Answer must be less than 1000 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    
    try {
      await createAnswerMutation.mutateAsync({
        content: content.trim(),
        questionId
      })
      
      setContent('')
    } catch (error) {
      console.error('Failed to create answer:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPrompt}>
        Please log in to answer this question.
      </div>
    )
  }

  return (
    <div className={styles.addAnswerSection}>
      <h3 className={styles.addAnswerTitle}>Your Answer</h3>
      
      <form onSubmit={handleSubmit} className={styles.answerForm}>
        <div className={styles.field}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            placeholder="Write your answer here..."
            maxLength={1000}
            rows={6}
          />
          {errors.content && (
            <span className={styles.error}>{errors.content}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={createAnswerMutation.isPending}
        >
          {createAnswerMutation.isPending ? 'Posting...' : 'Post Your Answer'}
        </button>
      </form>
    </div>
  )
}
