import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { UPDATE_TASK } from '../mutations/taskMutations';
import { GET_TASK } from '../queries/taskQueries';
interface TaskProps {
    _id: string,
    name: string,
    description: string,
    status: string,
    userId: string,
    user: { username: string },
}
const EditTaskForm = ({ task }: { task: TaskProps }) => {
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState('NOT_STARTED');

    const [updateTask] = useMutation(UPDATE_TASK, {
        variables: { id: task._id, taskInput: { name, description, status } },
        refetchQueries: [{ query: GET_TASK, variables: { id: task._id } }]
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !description || !status) {
            return alert('Please fill all fields!');
        }
        updateTask()
    }
    return (
        <div className='mt-3'>
            <h4>Update Task Details</h4>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input type="text" className='form-control' id='name'
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea className='form-control' id='description'
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Status</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => {
                        setStatus(e.target.value)
                    }}>
                        <option className='' value={'NOT_STARTED'}>New</option>
                        <option className='' value={'IN_PROGRESS'}>In Progress</option>
                        <option className='' value={'COMPLETED'}>Completed</option>
                    </select>
                </div>
                <button value="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default EditTaskForm