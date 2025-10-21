import { useState } from 'react'
import styles from './Account.module.css'

interface FormsSectionProps {
  onEditProfile: (username: string) => void
  onChangePassword: (data: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => void
  isUpdatingUser?: boolean
  isUpdatingPassword?: boolean
}

export default function FormsSection({ 
  onEditProfile, 
  onChangePassword, 
  isUpdatingUser = false, 
  isUpdatingPassword = false 
}: FormsSectionProps) {
  const [newUsername, setNewUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateUsername = (username: string) => {
    if (!username.trim()) {
      setUsernameError('Username cannot be empty')
      return false
    }
    if (username.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters long')
      return false
    }
    if (username.trim().length > 20) {
      setUsernameError('Username must be less than 20 characters')
      return false
    }
    setUsernameError('')
    return true
  }

  const validatePasswords = (oldPass: string, newPass: string, confirmPass: string) => {
    if (!oldPass || !newPass || !confirmPass) {
      setPasswordError('All password fields are required')
      return false
    }
    if (newPass !== confirmPass) {
      setPasswordError('New passwords do not match')
      return false
    }
    if (newPass.length < 8) {
      setPasswordError('New password must be at least 8 characters long')
      return false
    }
    if (oldPass === newPass) {
      setPasswordError('New password must be different from old password')
      return false
    }
    setPasswordError('')
    return true
  }

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUsernameError('')
    
    if (!validateUsername(newUsername)) {
      return
    }

    try {
      await onEditProfile(newUsername)
      setNewUsername('')
    } catch (error) {
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    
    if (!validatePasswords(oldPassword, newPassword, confirmPassword)) {
      return
    }

    try {
      await onChangePassword({ oldPassword, newPassword, confirmPassword })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
    }
  }

  return (
    <div className={styles.formsSection}>
      <div className={styles.editForm}>
        <h3 className={styles.formTitle}>Edit your profile:</h3>
        <form onSubmit={handleEditProfile}>
          <label className={styles.formLabel}>Change your username:</label>
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value)
              if (usernameError) setUsernameError('')
            }}
            className={`${styles.formInput} ${usernameError ? styles.inputError : ''}`}
            disabled={isUpdatingUser}
          />
          {usernameError && <div className={styles.errorMessage}>{usernameError}</div>}
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={isUpdatingUser || !newUsername.trim()}
          >
            {isUpdatingUser ? 'SAVING...' : 'SAVE'}
          </button>
        </form>
      </div>

      <div className={styles.passwordForm}>
        <h3 className={styles.formTitle}>Change your password:</h3>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value)
              if (passwordError) setPasswordError('')
            }}
            className={`${styles.formInput} ${passwordError ? styles.inputError : ''}`}
            disabled={isUpdatingPassword}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              if (passwordError) setPasswordError('')
            }}
            className={`${styles.formInput} ${passwordError ? styles.inputError : ''}`}
            disabled={isUpdatingPassword}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (passwordError) setPasswordError('')
            }}
            className={`${styles.formInput} ${passwordError ? styles.inputError : ''}`}
            disabled={isUpdatingPassword}
          />
          {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
          <button 
            type="submit" 
            className={styles.changePasswordButton}
            disabled={isUpdatingPassword || !oldPassword || !newPassword || !confirmPassword}
          >
            {isUpdatingPassword ? 'CHANGING...' : 'CHANGE PASSWORD'}
          </button>
        </form>
      </div>
    </div>
  )
}
