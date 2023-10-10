import React, { useContext } from 'react'
import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../queries/taskQueries'
import { AuthContext } from '../context/authContext'

const Tasks = () => {
  const {user} = useContext(AuthContext)
  console.log("user idddd: ",user.user_id)
  const { data, loading, error } = useQuery(GET_TASKS,{
    variables:{ userId:user.user_id }
  })

  if (loading) return <Spinner />
  if (error) return <p>Something went Wrong!</p>
  return (
    <>
      {!loading && !error && data.tasks.length > 0 ? (
        <div className="row mt-4">
          {data.tasks.map((task:any) => (
             console.log(task)
          ))}
        </div>
      ) : (<p>No Projects</p>)}

    </>
  )
}

export default Tasks