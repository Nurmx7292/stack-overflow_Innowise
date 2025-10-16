import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeEditor from '../../components/CodeEditor/CodeEditor'
import { useCreateQuestion } from '../../hooks/useQuestions'
import styles from './CreateQuestion.module.css'

export default function CreateQuestion() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [attachedCode, setAttachedCode] = useState('')
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

  const createQuestionMutation = useCreateQuestion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { title?: string; description?: string } = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters'
    } else if (title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters'
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required'
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    } else if (description.trim().length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    
    try {
      await createQuestionMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        attachedCode: attachedCode.trim() || undefined
      })
      
      navigate('/questions')
    } catch (error) {
      console.error('Failed to create question:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ask a Question</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Question Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="What's your question?"
            maxLength={200}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            placeholder="Provide details about your question..."
            maxLength={1000}
            rows={6}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Attached Code (optional):</label>
          <div className={styles.codeEditor}>
            <CodeEditor
              value={attachedCode}
              onChange={setAttachedCode}
              language="javascript"
              readOnly={false}
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={createQuestionMutation.isPending}
        >
          {createQuestionMutation.isPending ? 'Creating...' : 'ASK QUESTION'}
        </button>
      </form>
    </div>
  )
}

