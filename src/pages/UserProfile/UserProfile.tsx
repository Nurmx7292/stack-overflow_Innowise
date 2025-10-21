import { useParams, Link } from 'react-router-dom'
import { useUserById, useUserStatistic } from '../../hooks/useUserApi'
import ProfileCard from '../Account/ProfileCard'
import styles from './UserProfile.module.css'

export default function UserProfile() {
  const { id } = useParams<{ id: string }>()
  const userId = Number(id)
  const { data: userStatistic, isLoading: statLoading, error: statError } = useUserStatistic(userId)
  if (statLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          Loading...
        </div>
      </div>
    )
  }

  if (statError || !userStatistic) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          User not found
        </div>
        <Link to="/users" className={styles.backButton}>
          ← Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/users" className={styles.backButton}>
          ← Back to Users
        </Link>
        <h1 className={styles.title}>User Profile</h1>
      </div>

      <ProfileCard
        username={userStatistic.username}
        userId={userStatistic.id}
        role={userStatistic.role}
        statistics={{
          rating: userStatistic.statistic.rating,
          snippets: userStatistic.statistic.snippetsCount,
          comments: userStatistic.statistic.commentsCount,
          likes: userStatistic.statistic.likesCount,
          dislikes: userStatistic.statistic.dislikesCount,
          questions: userStatistic.statistic.questionsCount,
          correctAnswers: userStatistic.statistic.correctAnswersCount,
          regularAnswers: userStatistic.statistic.regularAnswersCount
        }}
        readonly={true}
      />
    </div>
  )
}
