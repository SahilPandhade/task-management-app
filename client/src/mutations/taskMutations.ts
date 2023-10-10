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
        }

    }
`

export { ADD_TASK }