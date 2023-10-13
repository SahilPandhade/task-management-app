import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'
import { GET_TASK } from '../queries/taskQueries'
import Spinner from '../components/Spinner'
import EditTaskForm from '../components/EditTaskForm'
import DeleteTask from '../components/DeleteTask'
import { DELETE_TASK } from '../mutations/taskMutations'
import { statusCodes } from '../utility/helper'
const TaskPage = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_TASK, { variables: { taskId: id } })
    const [deleteTask] = useMutation(DELETE_TASK, {
        variables: { id: id },
    })
    if (loading) return <Spinner />
    if (error) return <p>Something went wrong!</p>
    return (
        <>
            {!loading && !error && (
                <div className='container mt-5'>
                    <div className="card">
                        <div className="card-header d-flex flex-row align-items-center justify-content-between bg-primary text-white">
                            <h1 className='card-title'>{data.task.name}</h1>
                            <div className='d-flex flex-row gap-3'>
                                <DeleteTask handleDelete={deleteTask} />
                                <Link to="/dashboard" className='btn btn-light btn-md d-inline ms-auto'>Back</Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="mt-2">
                                <h5 className='card-title'>Task Details</h5>
                                <p className='card-text'>{data.task.description}</p>
                                <p className={`card-text lead`} style={{ color: statusCodes[data.task.status as keyof typeof statusCodes].color }}>
                                    {statusCodes[data.task.status as keyof typeof statusCodes].value}
                                </p>
                            </div>
                          
                            <EditTaskForm task={data.task} />

                        </div>
                    </div>

                </div>
            )}

        </>
    )
}

export default TaskPage