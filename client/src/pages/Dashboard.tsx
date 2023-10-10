import React from 'react'
import Tasks from '../components/Tasks'
import AddTaskModal from '../components/AddTaskModal'

const Dashboard = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddTaskModal />
      </div>
      <Tasks />
    </>
  )
}

export default Dashboard