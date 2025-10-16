import type { Answer as AnswerType } from '../../types/questions'
import styles from './Answer.module.css'

interface AnswerProps {
  answer: AnswerType
}

export default function Answer({ answer }: AnswerProps) {
  return (
    <div className={styles.answerItem}>
      <div className={styles.answerHeader}>
        <span className={styles.answerAuthor}>
          {answer.user.username}
        </span>
        {answer.isCorrect && (
          <span className={styles.correctAnswer}>✅ Correct Answer</span>
        )}
      </div>
      <div className={styles.answerContent}>
        <p>{answer.content}</p>
      </div>
    </div>
  )
}
