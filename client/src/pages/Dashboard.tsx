import React, { useContext, useEffect } from 'react'
import Tasks from '../components/Tasks'
import AddTaskModal from '../components/AddTaskModal'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user])
  // if(!user){ 
  //   navigate('/login')
  //   //return <Spinner/>
  // }
  return (
   user && <>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <AddTaskModal />
      </div>
      <Tasks />
      
    </>
  )
}

export default Dashboard