import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Questions from './pages/Questions/Questions'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Account from './pages/Account/Account'
import CreatePost from './pages/CreatePost/CreatePost'
import MySnippets from './pages/MySnippets/MySnippets'
import Post from './pages/Post/Post'
import CreateQuestion from './pages/CreateQuestion/CreateQuestion'
import QuestionDetail from './pages/QuestionDetail/QuestionDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="questions" element={<Questions />} />
        <Route path="questions/create" element={<CreateQuestion />} />
        <Route path="questions/:id" element={<QuestionDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserProfile />} />
        <Route path="account" element={<Account />} />
        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/my" element={<MySnippets />} />
        <Route path="posts/:id" element={<Post />} />
      </Route>
    </Routes>
  )
}

export default App
