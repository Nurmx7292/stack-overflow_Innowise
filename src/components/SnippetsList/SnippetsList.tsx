import { useMemo, useRef, useCallback } from 'react'
import { useInfiniteSnippets } from '../../hooks/useInfiniteSnippets'
import SnippetCard from '../SnippetCard/SnippetCard'
import styles from './SnippetsList.module.css'

interface SnippetsListProps {
  userId?: number
  title?: string
}

export default function SnippetsList({ userId, title = 'Recent Snippets' }: SnippetsListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteSnippets(userId ? { userId } : {})

  const allSnippets = useMemo(() => {
    return data?.pages.flatMap(page => page.data) || []
  }, [data])

  const observerRef = useRef<IntersectionObserver | undefined>(undefined)
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isFetchingNextPage) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    if (node) observerRef.current.observe(node)
  }, [isFetchingNextPage, fetchNextPage, hasNextPage])

  if (isLoading) {
    return <div className={styles.loading}>Loading snippets...</div>
  }

  if (error) {
    return <div className={styles.error}>Error loading snippets</div>
  }

  return (
    <div className={styles.container}>
       <h1 className={styles.title}>{title}</h1>
      <div className={styles.snippetsList}>
        {allSnippets.map((snippet, index) => {
          if (allSnippets.length === index + 1) {
            return (
              <div key={snippet.id} ref={lastElementRef}>
                <SnippetCard snippet={snippet} />
              </div>
            )
          }
          return <SnippetCard key={snippet.id} snippet={snippet} />
        })}
        {isFetchingNextPage && (
          <div className={styles.loadingMore}>Loading more...</div>
        )}
      </div>
    </div>
  )
}
