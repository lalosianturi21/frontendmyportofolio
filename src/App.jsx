import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import HomePage from './pages/home/HomePage'
import About from './pages/home/container/About'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ProfilePage from './pages/profile/ProfilePage'



function App() {
  return (
   <div className='App font-opensans'>
    <Routes>
      <Route index path='/' element={<HomePage />}/>
      <Route index path='/about' element={<About />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
   </div>
  )
}

export default App
