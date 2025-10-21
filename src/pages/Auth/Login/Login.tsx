import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import type { LoginCredentials } from '../../../types/auth'
import styles from './Login.module.css'

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  })
  
  const { login, loginError, isLoginPending } = useAuth()
  console.log(loginError)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    
    await login(credentials)
    navigate('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className={styles.input}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        
        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoginPending}
        >
          {isLoginPending ? 'Logging in...' : 'Login'}
        </button>
        
        {loginError && (
          <div className={styles.errorMessage}>{loginError}</div>
        )}
      </form>
      
      <div className={styles.link}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

