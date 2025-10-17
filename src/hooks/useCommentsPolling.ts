import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { snippetsService } from '../services/snippetsService'

interface UseCommentsPollingOptions {
  snippetId: number
  enabled?: boolean
  interval?: number
  pauseOnInactive?: boolean
  pauseOnScroll?: boolean
}

export const useCommentsPolling = ({
  snippetId,
  enabled = true,
  interval = 3000,
  pauseOnInactive = true,
  pauseOnScroll = true
}: UseCommentsPollingOptions) => {
  const queryClient = useQueryClient()
  const [isPolling, setIsPolling] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const intervalRef = useRef<number | null>(null)
  const isPageVisibleRef = useRef(true)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  const startPolling = () => {
    if (intervalRef.current) return
    
    setIsPolling(true)
    setLastUpdate(new Date())
    
    intervalRef.current = setInterval(async () => {
      if (!isPageVisibleRef.current && pauseOnInactive) return
      if (isScrollingRef.current && pauseOnScroll) return
      
      try {
        const updatedSnippet = await snippetsService.getSnippet(snippetId)
        queryClient.setQueryData(['snippet', snippetId], updatedSnippet)
        setLastUpdate(new Date())
      } catch (error) {
        console.error('Failed to poll comments:', error)
      }
    }, interval)
  }

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
    setIsPolling(false)
  }


  useEffect(() => {
    if (enabled && snippetId) {
      startPolling()
    } else {
      stopPolling()
    }

    return () => stopPolling()
  }, [enabled, snippetId])

  useEffect(() => {
    if (!pauseOnInactive) return

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [pauseOnInactive])

  useEffect(() => {
    if (!pauseOnScroll) return

    const handleScroll = () => {
      isScrollingRef.current = true
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [pauseOnScroll])

  return {
    isPolling,
    lastUpdate
  }
}
