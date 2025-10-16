import { Link } from 'react-router-dom'
import type { Question } from '../../types/questions'
import styles from './QuestionCard.module.css'

interface QuestionCardProps {
  question: Question
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const answersCount = question.answers?.length || 0

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.statusIcon}>🎯</div>
        <Link to={`/questions/${question.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{question.title}</h3>
        </Link>
      </div>
      
      <div className={styles.meta}>
        <span className={styles.author}>asked by user: {question.user.username}</span>
      </div>
      
      <p className={styles.description}>{question.description}</p>
      
      <div className={styles.actions}>
        <button className={styles.answersButton}>
          <span className={styles.answersIcon}>💬</span>
          <span className={styles.answersCount}>{answersCount}</span>
          <span className={styles.answersText}>Answers</span>
        </button>
        <div className={styles.views}>
          <span className={styles.viewsIcon}>👁️</span>
        </div>
      </div>
    </div>
  )
}

