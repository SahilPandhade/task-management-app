import React, { useContext, useState } from 'react'
import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../queries/taskQueries'
import { AuthContext } from '../context/authContext'
import TaskCard from './TaskCard'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
  const navigate = useNavigate()
  const [classNames, setClassNames] = useState<number>(0)
  const class_arr = ['text-bg-primary', 'text-bg-secondary', 'text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info', 'text-bg-light', 'text-bg-dark']

  const { user } = useContext(AuthContext)
  if (!user) {
    navigate('/')
  }
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: { userId: user.user_id }
  })

  // if (loading) return <Spinner />
  // if (error) return <p>Something went Wrong!</p>
  return (
    <>
      <div className="container mt-5 ">
        <div className="d-flex justify-content-center row row-cols-1 row-cols-md-4 gap-4">
          {!loading && !error && data.tasks.length > 0 ? (
            data.tasks.map((task: any, index: number) => (
              <div key={index} className='px-4'>
                <TaskCard task={task}
                  bodyClass={class_arr[(classNames + index) % class_arr.length]}
                />
              </div>
            ))
          )
            : (
              <>
                {
                  loading && <Spinner />
                }
                {
                  error && <p>Something went Wrong!</p>
                }
                {!loading && !error && <p>No Projects</p>}
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Tasks