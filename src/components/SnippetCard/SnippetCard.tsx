import type { Snippet } from '../../types/snippets'
import CodeEditor from '../CodeEditor/CodeEditor'
import styles from './SnippetCard.module.css'

interface SnippetCardProps {
  snippet: Snippet
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.userIcon}>👤</div>
          <span>{snippet.user.username}</span>
        </div>
        <div className={styles.language}>
          <span className={styles.languageIcon}>&lt;/&gt;</span>
          <span>{snippet.language}</span>
        </div>
      </div>
      <div className={styles.code}>
        <CodeEditor
          value={snippet.code}
          onChange={() => {}}
          language={snippet.language}
          readOnly={true}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <span>1</span>
          <span className={styles.likeIcon}>👍</span>
        </button>
        <button className={styles.actionButton}>
          <span>1</span>
          <span className={styles.dislikeIcon}>👎</span>
        </button>
        <button className={`${styles.actionButton} ${styles.commentButton}`}>
          <span>0</span>
          <span className={styles.commentIcon}>💬</span>
        </button>
      </div>
    </div>
  )
}
