import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuestions } from '../../hooks/useInfiniteQuestions'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import styles from './Questions.module.css'

export default function Questions() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuestions()

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading questions...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Error: {error?.message || 'Failed to load questions'}
        </div>
      </div>
    )
  }

  const allQuestions = data?.pages.flatMap(page => page.data) || []

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Questions</h1>
      
      <div className={styles.questionsList}>
        {allQuestions.length === 0 ? (
          <div className={styles.noQuestions}>
            No questions found. Be the first to ask a question!
          </div>
        ) : (
          allQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className={styles.loadMore}>
          {isFetchingNextPage ? 'Loading more questions...' : 'Load More'}
        </div>
      )}

      {!hasNextPage && allQuestions.length > 0 && (
        <div className={styles.endOfList}>
          You've reached the end of the questions list.
        </div>
      )}
    </div>
  )
}