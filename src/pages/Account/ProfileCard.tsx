import styles from './Account.module.css'

interface ProfileCardProps {
  username: string
  userId: number
  role: string
  statistics: {
    rating: number
    snippets: number
    comments: number
    likes: number
    dislikes: number
    questions: number
    correctAnswers: number
    regularAnswers: number
  }
  onEditProfile: () => void
  onDeleteAccount: () => void
}

export default function ProfileCard({
  username,
  userId,
  role,
  statistics,
  onEditProfile,
  onDeleteAccount
}: ProfileCardProps) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileSection}>
        <div className={styles.avatar}>
          <div className={styles.avatarIcon}>👤</div>
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{username}</h2>
          <div className={styles.userDetails}>
            <span>Id: {userId}</span>
            <span>Role: {role}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.editButton} onClick={onEditProfile}>
              <span>⎘</span>
            </button>
            <button className={styles.deleteButton} onClick={onDeleteAccount}>
              <span>🗑️</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.statisticsSection}>
        <div className={styles.statisticsList}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Rating:</span>
            <span className={styles.statValue}>{statistics.rating}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Snippets:</span>
            <span className={styles.statValue}>{statistics.snippets}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Comments:</span>
            <span className={styles.statValue}>{statistics.comments}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Likes:</span>
            <span className={styles.statValue}>{statistics.likes}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Dislikes:</span>
            <span className={styles.statValue}>{statistics.dislikes}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Questions:</span>
            <span className={styles.statValue}>{statistics.questions}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Correct Answers:</span>
            <span className={styles.statValue}>{statistics.correctAnswers}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Regular Answers:</span>
            <span className={styles.statValue}>{statistics.regularAnswers}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
