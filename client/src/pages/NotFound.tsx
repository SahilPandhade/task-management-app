import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 gap-2'>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>404</h1>
      <p className="lead">Sorry,This page does not exist.</p>
      <iframe src="https://giphy.com/embed/4NnSe87mg3h25JYIDh"
        width="480" height="270"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen>
      </iframe>
      <Link to={"/"} className='btn btn-primary'>Go Back</Link>
    </div>
  )
}

export default NotFound