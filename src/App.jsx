import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import HomePage from './pages/home/HomePage'
import About from './pages/home/container/About'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ProfilePage from './pages/profile/ProfilePage'
import ProjectPage from './pages/project/ProjectPage'
import AdminLayout from './pages/admin/AdminLayout'



function App() {
  return (
   <div className='App font-opensans'>
    <Routes>
      <Route index path='/' element={<HomePage />}/>
      <Route index path='/about' element={<About />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/admin" element={<AdminLayout />} />

    </Routes>
   </div>
  )
}

export default App
