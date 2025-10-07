import { useSnippets } from '../../hooks/useSnippets'
import SnippetCard from '../../components/SnippetCard/SnippetCard'
import styles from './Home.module.css'

export default function Home() {
  const { data, isLoading, error } = useSnippets({ page: 1, limit: 15 })
  if (isLoading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>Error loading snippets</div>

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to Codelang! &lt;/&gt;</h1>
      <div className={styles.snippetsGrid}>
        {data?.data.map(snippet => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </div>
  )
}
