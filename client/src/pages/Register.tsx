import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { GraphQLErrors } from '@apollo/client/errors'
import { useForm } from '../utility/hooks'
import { LoginType, RegisterType } from '../utility/Types'
import { REGISTER_USER } from '../mutations/userMutations'
import { validateRegistration } from '../utility/helper'


const Register = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const [errors, setErrors] = useState<GraphQLErrors>([])
    const [formError, setFormError] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const registerUserCallback = (values: RegisterType | LoginType | {}) => {
        const validationErrors = validateRegistration(values as RegisterType)
        setFormError(validationErrors);
        const noErrors = Object.values(validationErrors).every(error => error === '');
        if (noErrors) {
            registerUser()
            console.log('Form submitted:', values);
        }
        else{
            console.log("error registering")
        }
    }
    const { onChange, onSubmit, values } = useForm({
        callback: registerUserCallback,
        initialState: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })
   
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            login(userData)
            navigate("/")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values }
    })

  
    return (
        <div className='container'>
            {
                errors.map((error) => {
                    return (
                        <div key={error.name} className="alert alert-danger" role="alert">
                           {error.message}
                        </div>
                    )
                })
            }
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>Username</label>
                    <input
                        type="text"
                        className={`form-control ${formError.username ? 'is-invalid' : ''}`}
                        id="username"
                        name="username"
                        onChange={onChange}
                    />
                    {formError.username && <div className='invalid-feedback'>{formError.username}</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input
                        type="email"
                        className={`form-control ${formError.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        onChange={onChange}
                    />
                    {formError.email && <div className='invalid-feedback'>{formError.email}</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input
                        type="password"
                        className={`form-control ${formError.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        onChange={onChange}
                    />
                    {formError.password && <div className='invalid-feedback'>{formError.password}</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                    <input
                        type="password"
                        className={`form-control ${formError.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={onChange}
                    />
                    {formError.confirmPassword && <div className='invalid-feedback'>{formError.confirmPassword}</div>}
                </div>
                <button type="submit" className='btn btn-primary'> Register</button>
            </form>

        </div>
    )
}

export default Register