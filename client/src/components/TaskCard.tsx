import React, { useEffect, useState } from 'react'
import DeleteTask from './DeleteTask'
import { useMutation } from '@apollo/client'
import { DELETE_TASK, UPDATE_TASK } from '../mutations/taskMutations'
import { statusCodes } from '../utility/helper'
import { GET_TASKS } from '../queries/taskQueries'
import { TaskType } from '../utility/Types'
const TaskCard = ({ task, bodyClass }: { task: TaskType, bodyClass: string }) => {
  const [status, setStatus] = useState<string>(task.status)
  const [updateTask] = useMutation(UPDATE_TASK, {
    variables: { id: task._id, taskInput: { name: task.name, description: task.description,status } },
    //refetchQueries: [{ query: GET_TASKS, variables: { userId: task.userId } }]
  })

  useEffect(() => {
    if(status!==task.status){
      updateTask()
    }
    
  }, [status])
  
  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { id: task._id },
    update(cache) {
      // Remove the deleted task from the cache
      cache.modify({
        fields: {
          tasks(existingTasks = [], { readField }) {
            return existingTasks.filter(
              (existingTaskRef: any) => task._id !== readField('_id', existingTaskRef)
            );
          },
        },
      });
    },
  })
  const handleStatusChange =(newStatus:string)=>{
      setStatus(newStatus); 
  }
  return (
    <div className={`card task-card my-3 shadow`}
      style={{
        maxWidth: '20rem',
      }}>
      <div className={`card-header ${bodyClass}
        w-100 d-flex justify-content-between align-items-center text-black`}>
        <div>{task.name}</div>
        <DeleteTask handleDelete={deleteTask} />
      </div>
      <div className="card-body">
        <p className="card-text text-truncate">{task.description}</p>
        <div className='d-flex flex-row align-items-center gap-4'>
          <a href={`/tasks/${task._id}`} className='btn btn-sm w-75 rounded'
            style={{ backgroundColor: '#a881af' }}>
            View Task
          </a>
          <select id="status" className={`form-select text-sm ${statusCodes[status as keyof typeof statusCodes].color}`}
           value={status} 
           onChange={(e) =>handleStatusChange(e.target.value)}>
            <option className='text-black' value={'NOT_STARTED'}>New</option>
            <option className='text-black' value={'IN_PROGRESS'}>In Progress</option>
            <option className='text-black' value={'COMPLETED'}>Completed</option>
          </select>
        </div>
      </div>

    </div>
  )
}

export default TaskCard