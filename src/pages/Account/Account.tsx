import { useAuth } from "../../hooks/useAuth";
import {
  useUserStatistic,
  useUpdateUser,
  useUpdatePassword,
  useDeleteUser,
} from "../../hooks/useUserApi";
import { useNavigate } from "react-router-dom";
import styles from "./Account.module.css";
import ProfileCard from "./ProfileCard";
import FormsSection from "./FormsSection";

export default function Account() {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated, isUserLoading } = useAuth();
  const {
    data: userStatistic,
    isLoading: isStatisticLoading,
    error: statisticError,
  } = useUserStatistic(authUser?.id || 0);

  const updateUserMutation = useUpdateUser();
  const updatePasswordMutation = useUpdatePassword();
  const deleteUserMutation = useDeleteUser();

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          Please log in to view your account
        </div>
      </div>
    );
  }

  if (isUserLoading || isStatisticLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          Loading your account data...
        </div>
      </div>
    );
  }

  if (statisticError) {
    console.warn("Failed to load user statistics:", statisticError);
  }

  const userData = {
    username: authUser?.username || "Unknown",
    userId: authUser?.id || 0,
    role: authUser?.role || "user",
    statistics: {
      rating: userStatistic?.statistic?.rating || 0,
      snippets: userStatistic?.statistic?.snippetsCount || 0,
      comments: userStatistic?.statistic?.commentsCount || 0,
      likes: userStatistic?.statistic?.likesCount || 0,
      dislikes: userStatistic?.statistic?.dislikesCount || 0,
      questions: userStatistic?.statistic?.questionsCount || 0,
      correctAnswers: userStatistic?.statistic?.correctAnswersCount || 0,
      regularAnswers: userStatistic?.statistic?.regularAnswersCount || 0,
    },
  };

  const handleEditProfile = async (username: string) => {
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }

    if (username === authUser?.username) {
      alert("New username must be different from current username");
      return;
    }

    try {
      await updateUserMutation.mutateAsync({ username: username.trim() });
      alert("Username updated successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update username";
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleChangePassword = async (data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (data.newPassword.length < 8) {
      alert("New password must be at least 8 characters long");
      return;
    }

    if (data.oldPassword === data.newPassword) {
      alert("New password must be different from old password");
      return;
    }

    try {
      await updatePasswordMutation.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      alert("Password changed successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password";
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    const doubleConfirm = confirm(
      'This will permanently delete your account and all your data. Type "DELETE" to confirm.'
    );

    if (!doubleConfirm) {
      return;
    }

    try {
      await deleteUserMutation.mutateAsync();
      alert("Account deleted successfully");
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete account";
      alert(`Error: ${errorMessage}`);
    }
  };

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
        isUpdatingUser={updateUserMutation.isPending}
        isUpdatingPassword={updatePasswordMutation.isPending}
      />
    </div>
  );
}
