
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { GraphQLErrors } from '@apollo/client/errors'
import { LoginType, RegisterType } from '../utility/Types'
import { useForm } from '../utility/hooks'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../mutations/userMutations'
import { validateLoginForm } from '../utility/helper'

const Login = () => {
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)
    const [errors, setErrors] = useState<GraphQLErrors>([])
    const [formError, setFormError] = useState({ email: '', password: ''})

    const loginUserCallback = (values:RegisterType | LoginType | {})=>{
        const validationErrors = validateLoginForm(values as LoginType)
        setFormError(validationErrors)
        const noErrors = Object.values(validationErrors).every(error => error === '');
        if (noErrors) {
            loginUser()
            // navigate('/dashboard')
        }
        else{
            console.log("error logging in")
        }
    }

    const { onChange, onSubmit, values } = useForm({
        callback: loginUserCallback,
        initialState: {
            email: '',
            password: '',
        }
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
            login(userData)
            navigate("/dashboard")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
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
        <button type="submit" className='btn btn-primary'> Login</button>
    </form>

</div>
  )
}

export default Login