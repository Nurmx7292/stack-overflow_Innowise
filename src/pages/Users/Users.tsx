import { useUsers } from '../../hooks/useUserApi'
import UsersTable from './UsersTable'
import styles from './Users.module.css'

export default function Users() {
  const { data: usersData, isLoading, error } = useUsers()

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Users</h1>
        <div className={styles.loadingMessage}>
          Loading users...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Users</h1>
        <div className={styles.errorMessage}>
          Failed to load users. Please try again later.
        </div>
      </div>
    )
  }

  if (!usersData || !usersData.data || usersData.data.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Users</h1>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>👥</div>
          <p className={styles.emptyStateText}>No users found</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <UsersTable users={usersData.data} />
    </div>
  )
}
