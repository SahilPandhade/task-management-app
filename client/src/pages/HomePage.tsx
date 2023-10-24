import React, { useContext, useState } from 'react'
import banner_image from '../assets/homepage.jpg'
import Features from '../components/Features'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
const HomePage = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [imgLoading, setImgLoading] = useState(true)
  const handleClick = () => {
    if (!user) {
      navigate('/register')
    }
    else {
      navigate('/dashboard')
    }
  }
  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <div
          style={{
            position: 'relative',
            height: '650px',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={banner_image}
            onLoad={() => setImgLoading(false)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(70%)',
            }}
          />
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <h1 className="text-white text-center mb-4">
              Supercharge your productivity with TaskQL
            </h1>
            <button className="btn btn-lg shadow" style={{ backgroundColor: '#5adbb5' }} onClick={handleClick}>
              {user ? 'Go to my dashboard' : 'Get Started'}
            </button>
          </div>
          
        </div>
        <Features />
        <Footer />

      </div>

    </>

  )
}

export default HomePage