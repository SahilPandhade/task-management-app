import {gql} from '@apollo/client'

const GET_TASKS = gql`
    query getTasks{
        tasks {
            id
            name
            description
            status
            userId
        }
    }

`
export {GET_TASKS}