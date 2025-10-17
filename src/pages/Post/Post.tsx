import { useParams } from 'react-router-dom'
import { useSnippet } from '../../hooks/useSnippets'
import SnippetCard from '../../components/SnippetCard/SnippetCard'
import CommentsSection from './CommentsSection'
import styles from './Post.module.css'

export default function Post() {
  const { id } = useParams<{ id: string }>()
  const snippetId = id ? parseInt(id) : 0
  
  const { data: snippet, isLoading, error } = useSnippet(snippetId)

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  if (error || !snippet) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Snippet not found</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <SnippetCard 
        snippet={snippet} 
        showCommentsButton={false}
      />
      <CommentsSection snippet={snippet} />
    </div>
  )
}

