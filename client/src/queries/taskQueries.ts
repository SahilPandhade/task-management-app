import {gql} from '@apollo/client'

const GET_TASKS = gql`
    query getTasks($userId: ID!){
        tasks(userId:$userId) {
            _id
            name
            description
            status
            userId
            user{
                username
            }
        }
    }

`
export {GET_TASKS}