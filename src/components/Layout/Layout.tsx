import { Outlet, Link, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>&lt;/&gt;</span> CODELANG
        </Link>
        <div className={styles.headerRight}>
          <button className={styles.signOut}>SIGN OUT</button>
          <div className={styles.language}>
            <span>EN</span>
            <span>▼</span>
          </div>
        </div>
      </header>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.userSection}>
            <div className={styles.sidebarUser}>
              <div className={styles.userIcon}>👤</div>
              <span>denis</span>
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
        
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
