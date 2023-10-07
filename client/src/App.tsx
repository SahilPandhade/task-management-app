import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <div>
        <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </div>
    </>
  )
}

export default App
