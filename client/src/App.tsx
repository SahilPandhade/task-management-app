import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
