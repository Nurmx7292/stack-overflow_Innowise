import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Snippet } from '../../types/snippets'
import { useSnippetStats } from '../../hooks/useSnippetStats'
import { useMarkSnippet, useUpdateSnippet } from '../../hooks/useSnippets'
import { useAuth } from '../../hooks/useAuth'
import CodeEditor from '../CodeEditor/CodeEditor'
import styles from './SnippetCard.module.css'

interface SnippetCardProps {
  snippet: Snippet
  showCommentsButton?: boolean
  onCommentClick?: () => void
  editable?: boolean
}

export default function SnippetCard({ 
  snippet, 
  showCommentsButton = true, 
  onCommentClick,
  editable = false
}: SnippetCardProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { likesCount, dislikesCount, commentsCount, userReaction } = useSnippetStats(snippet)
  const markSnippetMutation = useMarkSnippet()

  const [localReaction, setLocalReaction] = useState<'like' | 'dislike' | null>(null)
  const [localLikesCount, setLocalLikesCount] = useState(0)
  const [localDislikesCount, setLocalDislikesCount] = useState(0)

  useEffect(() => {
    setLocalReaction(userReaction)
    setLocalLikesCount(likesCount)
    setLocalDislikesCount(dislikesCount)
  }, [userReaction, likesCount, dislikesCount])

  const handleReaction = (type: 'like' | 'dislike') => {
    if (!user) return

    const previousReaction = localReaction
    const previousLikesCount = localLikesCount
    const previousDislikesCount = localDislikesCount

    let newReaction: 'like' | 'dislike' | null = null

    if (localReaction === type) {
      setLocalReaction(null)
      if (type === 'like') {
        setLocalLikesCount(prev => prev - 1)
      } else {
        setLocalDislikesCount(prev => prev - 1)
      }
      newReaction = null
    } else {
      const wasOpposite = localReaction === (type === 'like' ? 'dislike' : 'like')
      setLocalReaction(type)
      if (type === 'like') {
        setLocalLikesCount(prev => prev + 1)
        if (wasOpposite) {
          setLocalDislikesCount(prev => prev - 1)
        }
      } else {
        setLocalDislikesCount(prev => prev + 1)
        if (wasOpposite) {
          setLocalLikesCount(prev => prev - 1)
        }
      }
      newReaction = type
    }

    if (newReaction) {
      markSnippetMutation.mutate({
        id: parseInt(snippet.id),
        data: { mark: newReaction }
      }, {
        onError: () => {
          setLocalReaction(previousReaction)
          setLocalLikesCount(previousLikesCount)
          setLocalDislikesCount(previousDislikesCount)
        }
      })
    }
  }
  const [editedCode, setEditedCode] = useState(snippet.code)
  const updateSnippetMutation = useUpdateSnippet()

  useEffect(() => {
    setEditedCode(snippet.code)
  }, [snippet.code])

  const isDirty = editable && editedCode !== snippet.code

  const handleSave = () => {
    if (!isDirty) return
    updateSnippetMutation.mutate({
      id: parseInt(snippet.id),
      data: { code: editedCode.trim() }
    })
  }

  const handleCancel = () => {
    setEditedCode(snippet.code)
  }

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
          value={editedCode}
          onChange={(v) => setEditedCode(v)}
          language={snippet.language}
          readOnly={!editable}
        />
        {isDirty && (
          <div className={styles.actions}>
            <button 
              className={styles.actionButton}
              onClick={handleSave}
              disabled={updateSnippetMutation.isPending}
            >
              Save
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleCancel}
              disabled={updateSnippetMutation.isPending}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <button 
          className={`${styles.actionButton} ${localReaction === 'like' ? styles.active : ''}`}
          onClick={() => handleReaction('like')}
        >
          <span>{localLikesCount}</span>
          <span className={styles.likeIcon}>👍</span>
        </button>
        <button 
          className={`${styles.actionButton} ${localReaction === 'dislike' ? styles.active : ''}`}
          onClick={() => handleReaction('dislike')}
        >
          <span>{localDislikesCount}</span>
          <span className={styles.dislikeIcon}>👎</span>
        </button>
        {showCommentsButton && (
          <button 
            className={`${styles.actionButton} ${styles.commentButton}`}
            onClick={onCommentClick || (() => navigate(`/posts/${snippet.id}`))}
          >
            <span>{commentsCount}</span>
            <span className={styles.commentIcon}>💬</span>
          </button>
        )}
      </div>
    </div>
  )
}
