import React from 'react'
import DeleteTask from './DeleteTask'
import { useMutation } from '@apollo/client'
import { DELETE_TASK } from '../mutations/taskMutations'
const TaskCard = ({ task,bodyClass }: {task:any,bodyClass:string}) => {
    const [deleteTask] = useMutation(DELETE_TASK,{
        variables:{id:task._id},
        update(cache) {
            // Remove the deleted task from the cache
            cache.modify({
              fields: {
                tasks(existingTasks = [], { readField }) {
                  return existingTasks.filter(
                    (existingTaskRef:any) => task._id !== readField('_id', existingTaskRef)
                  );
                },
              },
            });
          },
    })
    return (
        <div className={`card  my-3 shadow`} style={{maxWidth:'20rem',maxHeight:'auto'}}>
            <div className={`card-header ${bodyClass} w-100 d-flex justify-content-between align-items-center text-black`}>
                <div>{task.name}</div>
                <DeleteTask handleDelete={deleteTask}/>
            </div>
            <div className="card-body">
                <p className="card-text">{(task.description as string).slice(0, Math.max(task.description.length, 25))}</p>
                {/* <a href="#" className={`btn ${className==='text-bg-primary'?'btn-secondary':'btn-primary'} btn-sm`}> */}
                <a href="#" className='btn' style={{backgroundColor:'#00FF00'}}>
                    View Task
                </a>

            </div>
        </div>
    )
}

export default TaskCard