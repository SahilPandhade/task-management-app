import React, { FormEvent, useContext, useState } from 'react'
import { ADD_TASK } from '../mutations/taskMutations'
import { useMutation } from '@apollo/client'
import { FaList } from 'react-icons/fa'
import { AuthContext } from '../context/authContext'
import { GraphQLErrors } from '@apollo/client/errors'
import { useNavigate } from 'react-router-dom'
const AddTaskModal = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<GraphQLErrors>([])
  const [status, setStatus] = useState('NOT_STARTED')
  const { user } = useContext(AuthContext)
  const [addTask] = useMutation(ADD_TASK, {
    variables: { name, description, status, userId: user.user_id },
    update(cache, { data: addTask }) {
      // Remove the deleted task from the cache
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            return [...existingTasks, addTask]
          },
        },
      });
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors)
      console.log("Error writing the task to db(client side:)", errors)
    },
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill all fields')
    }
    if (user && user.user_id) {
      addTask({
        variables: { taskInput: { name, description, status }, userId: user.user_id }
      });
    }
    setName('');
    setDescription('');
    setStatus('NOT_STARTED')
  }
  return (
    <>
      <button className="btn btn-primary btn-lg shadow" data-bs-toggle="modal" data-bs-target="#addTaskModal">
        <div className="d-flex align-items-center gap-2">
          <FaList className='icon' />
          <div>Add a Task</div>
        </div>
      </button>
      <div className="modal fade" id="addTaskModal" aria-labelledby="addTaskModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="addTaskModal">New Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Task Name</label>
                  <input type="text" className='form-control' id='name'
                    value={name} onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Describe the task</label>
                  <textarea className='form-control' id='description'
                    value={description} onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Status</label>
                  <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option className='' value={'NOT_STARTED'}>New</option>
                    <option className='' value={'IN_PROGRESS'}>In Progress</option>
                    <option className='' value={'COMPLETED'}>Completed</option>
                  </select>
                </div>
                <button type='submit' data-bs-dismiss="modal" className='btn btn-dark'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTaskModal