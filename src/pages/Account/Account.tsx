import styles from './Account.module.css'
import ProfileCard from './ProfileCard'
import FormsSection from './FormsSection'

export default function Account() {
  const userData = {
    username: 'denis',
    userId: 3,
    role: 'user',
    statistics: {
      rating: 1,
      snippets: 1,
      comments: 0,
      likes: 0,
      dislikes: 0,
      questions: 0,
      correctAnswers: 0,
      regularAnswers: 0
    }
  }

  const handleEditProfile = (username: string) => {
    console.log('Edit profile:', username)
  }

  const handleChangePassword = (data: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    console.log('Change password:', data)
  }

  const handleDeleteAccount = () => {
    console.log('Delete account')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>
        Welcome, <span className={styles.username}>{userData.username}</span>
      </h1>

      <ProfileCard
        username={userData.username}
        userId={userData.userId}
        role={userData.role}
        statistics={userData.statistics}
        onEditProfile={() => handleEditProfile(userData.username)}
        onDeleteAccount={handleDeleteAccount}
      />

      <FormsSection
        onEditProfile={handleEditProfile}
        onChangePassword={handleChangePassword}
      />
    </div>
  )
}