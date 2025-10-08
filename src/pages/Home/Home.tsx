import SnippetsList from '../../components/SnippetsList/SnippetsList'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <SnippetsList />
    </div>
  )
}
