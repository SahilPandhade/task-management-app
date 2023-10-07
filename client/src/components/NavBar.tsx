import React from 'react'
import { MdAddTask } from "react-icons/md"
import { Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <Link to="/" style={{textDecoration:'none', color:'white'}}>
                        <MdAddTask className="d-inline-block align-items-center me-2" />
                        Task Manager
                    </Link>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link " aria-current="page" >Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default NavBar