import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import type { RegisterCredentials } from '../../../types/auth'
import styles from './Register.module.css'

export default function Register() {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [localError, setLocalError] = useState('')
  
  const { register, registerError, isRegisterPending } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (credentials.password !== credentials.confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    try {
      await register(credentials)
      navigate('/login')
    } catch (err) {
    }
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
      <h1 className={styles.title}>Register</h1>
      
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
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChange={handleChange}
          className={styles.input}
          required
        />
        
        <button 
          type="submit" 
          className={styles.button}
          disabled={isRegisterPending}
        >
          {isRegisterPending ? 'Creating account...' : 'Register'}
        </button>
        
        {(registerError || localError) && (
          <div className={styles.errorMessage}>{registerError || localError}</div>
        )}
      </form>
      
      <div className={styles.link}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

