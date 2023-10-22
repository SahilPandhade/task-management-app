import { faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="Footer w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>Thanks for visiting </span>TaskQL</h3>
                            <p>Keep visiting,new features getting added soon...</p>
                            {/* <div className="footer-icons">
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </div> */}
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
                        <div className="footer-icons col-md-6 col-lg-4 col-12 ft-3">
                            <FontAwesomeIcon icon={faSquareTwitter} />
                            </div>
                        {/* <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Quick Links</h5>
                            <p><i className="fa-solid fa-phone-volume"></i> +92 3121324083</p>
                            <p><i className="fa-solid fa-envelope"></i> waleedishfaq1515@gmail.com</p>
                            <p><i className="fa-solid fa-paper-plane"></i> Abbottabad, Pakistan.</p>
                        </div> */}
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