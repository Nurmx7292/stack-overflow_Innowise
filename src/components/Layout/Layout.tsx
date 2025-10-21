import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      
      <div className={styles.content}>
        <Sidebar />
        
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
