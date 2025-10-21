import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuestions } from '../../hooks/useInfiniteQuestions'
import { useAuth } from '../../hooks/useAuth'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import styles from './Questions.module.css'

export default function Questions() {
  const { user } = useAuth()
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuestions()

  const {
    data: userQuestionsData,
    isLoading: userQuestionsLoading,
  } = useInfiniteQuestions({ userId: user?.id.toString() })

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allQuestions = data?.pages.flatMap(page => page.data) || []
  const userQuestions = userQuestionsData?.pages.flatMap(page => page.data) || []
  
  const sortedQuestions = useMemo(() => {
    if (!user || userQuestions.length === 0) {
      return allQuestions
    }
    
    const userQuestionIds = new Set(userQuestions.map(q => q.id))
    const otherQuestions = allQuestions.filter(q => !userQuestionIds.has(q.id))
    
    return [...userQuestions, ...otherQuestions]
  }, [allQuestions, userQuestions, user])

  if (isLoading || userQuestionsLoading) {
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Questions</h1>
      
      <div className={styles.questionsList}>
        {sortedQuestions.length === 0 ? (
          <div className={styles.noQuestions}>
            No questions found. Be the first to ask a question!
          </div>
        ) : (
          sortedQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className={styles.loadMore}>
          {isFetchingNextPage ? 'Loading more questions...' : 'Load More'}
        </div>
      )}

      {!hasNextPage && sortedQuestions.length > 0 && (
        <div className={styles.endOfList}>
          You've reached the end of the questions list.
        </div>
      )}
    </div>
  )
}