import type { User } from '../../types/user'
import UserRow from './UserRow'
import styles from './Users.module.css'

interface UsersTableProps {
  users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <table className={styles.usersTable}>
      <thead className={styles.tableHeader}>
        <tr>
          <th>№</th>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {users.map((user, index) => (
          <UserRow key={user.id} user={user} index={index} />
        ))}
      </tbody>
    </table>
  )
}
