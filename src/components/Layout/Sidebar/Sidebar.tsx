import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const location = useLocation()
  const { user } = useAuth()
  console.log(user)
  return (
    <div className={styles.sidebar}>
      <div className={styles.userSection}>
        <div className={styles.sidebarUser}>
          <div className={styles.userIcon}>👤</div>
          <span>{user?.username || 'Guest'}</span>
          <span>←</span>
        </div>
      </div>
      
      <ul className={styles.navLinks}>
        <li>
          <Link 
            to="/" 
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            <div className={styles.navIcon}>🏠</div>
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/account" 
            className={`${styles.navLink} ${location.pathname === '/account' ? styles.active : ''}`}
          >
            <div className={styles.navIcon}>👤</div>
            My Account
          </Link>
        </li>
        <li>
          <Link 
            to="/posts/create" 
            className={`${styles.navLink} ${location.pathname === '/posts/create' ? styles.active : ''}`}
          >
            <div className={styles.navIcon}>📄</div>
            Post snippet
          </Link>
        </li>
        <li>
          <Link 
            to="/posts/my" 
            className={`${styles.navLink} ${location.pathname === '/posts/my' ? styles.active : ''}`}
          >
            <div className={styles.navIcon}>📚</div>
            My snippets
          </Link>
        </li>
        <li>
          <Link 
            to="/questions" 
            className={`${styles.navLink} ${location.pathname === '/questions' ? styles.active : ''}`}
          >
            <div className={styles.navIcon}>❓</div>
            Questions
          </Link>
        </li>
        <li>
          <Link 
            to="/users" 
            className={`${styles.navLink} ${location.pathname === '/users' ? styles.active : ''}`}
          >
            <div className={styles.navIcon}>👥</div>
            Users
          </Link>
        </li>
      </ul>
    </div>
  )
}
