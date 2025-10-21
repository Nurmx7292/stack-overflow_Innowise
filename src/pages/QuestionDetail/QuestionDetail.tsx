import { useParams } from 'react-router-dom'
import { useQuestion } from '../../hooks/useQuestions'
import CodeEditor from '../../components/CodeEditor/CodeEditor'
import Answer from '../../components/Answer/Answer'
import AddAnswer from '../../components/AddAnswer/AddAnswer'
import styles from './QuestionDetail.module.css'

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>()
  const questionId = id || ''

  const { data: question, isLoading, error } = useQuestion(questionId)

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading question...</div>
      </div>
    )
  }

  if (error || !question) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Error: {error?.message || 'Question not found'}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionSection}>
        <div className={styles.questionHeader}>
          <h1 className={styles.title}>{question.title}</h1>
          <div className={styles.status}>
            {question.isResolved ? (
              <span className={styles.resolved}>✅ Resolved</span>
            ) : (
              <span className={styles.unresolved}>❓ Unresolved</span>
            )}
          </div>
        </div>

        <div className={styles.questionMeta}>
          <span className={styles.author}>Asked by: {question.user.username}</span>
        </div>

        <div className={styles.description}>
          <p>{question.description}</p>
        </div>

        {question.attachedCode && (
          <div className={styles.codeSection}>
            <h3 className={styles.codeTitle}>Attached Code:</h3>
            <div className={styles.codeEditor}>
              <CodeEditor
                value={question.attachedCode}
                onChange={() => {}}
                language="javascript"
                readOnly={true}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.answersSection}>
        <h2 className={styles.answersTitle}>
          Answers ({question.answers?.length || 0})
        </h2>

        <div className={styles.answersList}>
          {!question.answers || question.answers.length === 0 ? (
            <div className={styles.noAnswers}>
              No answers yet. Be the first to answer this question!
            </div>
          ) : (
            question.answers.map((answer) => (
              <Answer key={answer.id} answer={answer} />
            ))
          )}
        </div>
      </div>

      <AddAnswer questionId={questionId} />
    </div>
  )
}
