import { faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="Footer w-100">
                <div className="container">
                    <div className="row d-flex flex-row justify-content-between">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>Thanks for visiting </span>TaskQL</h3>
                            <p>Keep visiting,new features getting added soon...</p>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Quick Links</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="https://sahil-pandhade-portfolio.onrender.com"  target="_blank">Portfolio</a>
                                </li>
                                <li className="nav-item">
                                    <a href="mailto:sahilrp612@gmail.com">Send an email</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="https://www.linkedin.com/in/sahil-pandhade-669655191/" target='_blank'>LinkedIn</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="https://github.com/SahilPandhade" target='_blank'>Github</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>  
            </div>
            <div className='Last-footer w-100'>
                <p>Created by Sahil Pandhade</p>
            </div>       
        </>
    )
}

export default Footer