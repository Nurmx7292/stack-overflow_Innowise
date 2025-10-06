import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Questions from './pages/Questions/Questions'
import Users from './pages/Users/Users'
import Account from './pages/Account/Account'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="questions" element={<Questions />} />
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
        <Route path="posts/create" element={<div>Create Post</div>} />
        <Route path="posts/my" element={<div>My Posts</div>} />
      </Route>
    </Routes>
  )
}

export default App
