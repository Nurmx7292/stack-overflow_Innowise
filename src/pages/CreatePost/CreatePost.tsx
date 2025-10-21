import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeEditor from '../../components/CodeEditor/CodeEditor'
import { useCreateSnippet } from '../../hooks/useSnippets'
import { useLanguages } from '../../hooks/useSnippets'
import styles from './CreatePost.module.css'

export default function CreatePost() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('')
  const [errors, setErrors] = useState<{ code?: string; language?: string }>({})

  const { data: languages = [], isLoading: languagesLoading } = useLanguages()
  const createSnippetMutation = useCreateSnippet()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { code?: string; language?: string } = {}
    
    if (!code.trim()) {
      newErrors.code = 'Code is required'
    }
    
    if (!language) {
      newErrors.language = 'Language is required'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    
    try {
      await createSnippetMutation.mutateAsync({
        code: code.trim(),
        language
      })
      
      navigate('/')
    } catch (error) {
      console.error('Failed to create snippet:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create new snippet!</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Language of your snippet:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.select}
            disabled={languagesLoading}
          >
            <option value="">Select</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.language && (
            <span className={styles.error}>{errors.language}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Code of your snippet:</label>
          <div className={styles.codeEditor}>
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language || 'javascript'}
              readOnly={false}
            />
          </div>
          {errors.code && (
            <span className={styles.error}>{errors.code}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={createSnippetMutation.isPending}
        >
          {createSnippetMutation.isPending ? 'Creating...' : 'CREATE SNIPPET'}
        </button>
      </form>
    </div>
  )
}
