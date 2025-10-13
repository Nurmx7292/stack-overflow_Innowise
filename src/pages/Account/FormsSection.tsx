import { useState } from 'react'
import styles from './Account.module.css'

interface FormsSectionProps {
  onEditProfile: (username: string) => void
  onChangePassword: (data: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => void
}

export default function FormsSection({ onEditProfile, onChangePassword }: FormsSectionProps) {
  const [newUsername, setNewUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault()
    onEditProfile(newUsername)
    setNewUsername('')
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    onChangePassword({ oldPassword, newPassword, confirmPassword })
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
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
            onChange={(e) => setNewUsername(e.target.value)}
            className={styles.formInput}
          />
          <button type="submit" className={styles.saveButton}>
            SAVE
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
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.formInput}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.formInput}
          />
          <button type="submit" className={styles.changePasswordButton}>
            CHANGE PASSWORD
          </button>
        </form>
      </div>
    </div>
  )
}
