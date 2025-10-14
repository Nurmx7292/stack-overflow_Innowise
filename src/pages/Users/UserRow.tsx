import { Link } from 'react-router-dom'
import type { User } from '../../types/user'
import styles from './Users.module.css'

interface UserRowProps {
  user: User
  index: number
}

export default function UserRow({ user, index }: UserRowProps) {
  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return styles.roleAdmin
      default:
        return styles.roleUser
    }
  }

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        {index + 1}
      </td>
      <td className={styles.tableCell}>
        {user.id}
      </td>
      <td className={styles.tableCell}>
        <Link to={`/users/${user.id}`} className={styles.usernameLink}>
          {user.username}
        </Link>
      </td>
      <td className={styles.tableCell}>
        <span className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
          {user.role}
        </span>
      </td>
    </tr>
  )
}
