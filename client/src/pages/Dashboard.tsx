import React, { useContext, useEffect } from 'react'
import Tasks from '../components/Tasks'
import AddTaskModal from '../components/AddTaskModal'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Dashboard = () => {
  const {user} = useContext(AuthContext)
  if(!user) return <Spinner/>
  return (
   <>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <AddTaskModal />
      </div>
      <Tasks />
      
    </>
  )
}

export default Dashboard