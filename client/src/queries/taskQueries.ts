import {gql} from '@apollo/client'

const GET_TASK = gql`
    query getTask($taskId:ID!){
        task(taskId:$taskId){
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
export {GET_TASK,GET_TASKS}