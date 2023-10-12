import React from 'react'
import DeleteTask from './DeleteTask'
import { useMutation } from '@apollo/client'
import { DELETE_TASK } from '../mutations/taskMutations'
import { statusCodes } from '../utility/helper'
const TaskCard = ({ task, bodyClass }: { task: any, bodyClass: string }) => {
  const status = statusCodes[task.status as keyof typeof statusCodes].value
  const status_color = statusCodes[task.status as keyof typeof statusCodes].color
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
  return (
    <div className={`card my-3 shadow`} style={{ maxWidth: '20rem' }}>
      <div className={`card-header ${bodyClass} w-100 d-flex justify-content-between align-items-center text-black`}>
        <div>{task.name}</div>
        <DeleteTask handleDelete={deleteTask} />
      </div>
      <div className="card-body">
        <p className="card-text">{(task.description as string).slice(0, Math.max(task.description.length, 25))}</p>
        <div className='d-flex flex-row align-items-center justify-content-between'>
          <a href="#" className='btn btn-sm' style={{ backgroundColor: '#80669d' }}>
            View Task
          </a>
          <div><strong style={{color:status_color}}>{status}</strong></div>
        </div>

      </div>
    </div>
  )
}

export default TaskCard