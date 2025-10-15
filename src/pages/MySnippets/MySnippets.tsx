import { useAuth } from '../../hooks/useAuth'
import SnippetsList from '../../components/SnippetsList/SnippetsList'
import styles from './MySnippets.module.css'

export default function MySnippets() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>Please log in to view your snippets</div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <SnippetsList 
        userId={user.id.toString()} 
        title="My Snippets" 
      />
    </div>
  )
}
