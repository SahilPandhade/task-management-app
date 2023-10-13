import React from 'react'
import { MdDelete } from 'react-icons/md'

interface DeleteProps{
    handleDelete:()=>void
}
const DeleteTask = ({handleDelete}:DeleteProps) => {
    return (
        <>
            <button type="button" className='d-flex align-items-center' data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" style={{ background: 'none', border: 'none' }}>
                <MdDelete className="" style={{ fontSize: '1.4rem',color:'red' }} />
            </button>
            <div className="modal fade" id="confirmDeleteModal" aria-labelledby="confirmDeleteModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5" id="confirmDeleteModalName">Confirm Delete Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this task?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-danger" id="confirmDelete" data-bs-dismiss="modal" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteTask