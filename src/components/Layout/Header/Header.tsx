import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>&lt;/&gt;</span> CODELANG
      </Link>
      <div className={styles.headerRight}>
        <div className={styles.userInfo}>
          <span>denis</span>
          <div className={styles.userIcon}>👤</div>
        </div>
        <button className={styles.signOut}>SIGN OUT</button>
        <div className={styles.language}>
          <span>EN</span>
          <span>▼</span>
        </div>
      </div>
    </header>
  )
}
