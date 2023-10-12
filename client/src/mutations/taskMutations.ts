import { gql } from "@apollo/client";

const ADD_TASK = gql`
    mutation addTask($taskInput: TaskInput!, $userId: String!){
        addTask(taskInput: $taskInput, userId: $userId){
            name
            description
            status
            user{
                username
            }
            _id
        }

    }
`

const DELETE_TASK = gql`
    mutation deleteTask($id:ID!){
        deleteTask(id:$id){
            name
            description
            status
            userId
        }
    }

`

export { ADD_TASK,DELETE_TASK }