import gql from 'graphql-tag'

const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput){
        loginUser(loginInput:$loginInput){
            _id
            username
            email
            # userName
            token
        }
    }
`
const REGISTER_USER = gql`
    mutation Mutation ($registerInput: RegisterInput){
        registerUser(registerInput:$registerInput){
            email
            username
            token
        }
    }
`
export {LOGIN_USER,REGISTER_USER}