import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import HomePage from './pages/home/HomePage'
import About from './pages/home/container/About'



function App() {
  return (
   <div className='App font-opensans'>
    <Routes>
      <Route index path='/' element={<HomePage />}/>
      <Route index path='/about' element={<About />}/>
    </Routes>
   </div>
  )
}

export default App
