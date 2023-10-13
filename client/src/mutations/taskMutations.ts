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

const UPDATE_TASK = gql`
    mutation updateTask($id:ID!,$taskInput:TaskInput!){
        updateTask(id:$id,taskInput:$taskInput){
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

export { ADD_TASK,DELETE_TASK,UPDATE_TASK }