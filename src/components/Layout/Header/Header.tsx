import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import styles from './Header.module.css'

export default function Header() {
  const { user, logout } = useAuth()

  const handleSignOut = () => {
    logout()
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>&lt;/&gt;</span> CODELANG
      </Link>
      <div className={styles.headerRight}>
        {user ? (
          <>
            <Link to="/questions/create" className={styles.askQuestion}>
              Ask question
            </Link>
            <div className={styles.userInfo}>
              <div className={styles.userIcon}>👤</div>
            </div>
            <button className={styles.signOut} onClick={handleSignOut}>
              SIGN OUT
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.signOut}>
            SIGN IN
          </Link>
        )}
        <div className={styles.language}>
          <span>EN</span>
          <span>▼</span>
        </div>
      </div>
    </header>
  )
}
