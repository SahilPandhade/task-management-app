module.exports = `#graphql
type User {
    username:String
    email:String
    password:String
    token:String
}
enum TaskStatus{
    NOT_STARTED
    IN_PROGRESS
    COMPLETED
}
type Task {
    name: String
    description: String
    status: TaskStatus
    userId:String
    user:User
}
input TaskInput {
    name:String,
    description:String,
    status:String,
}
input RegisterInput{
    username:String
    email:String
    password:String
    confirmPassword:String
}

input LoginInput{
    email:String
    password:String
}
type Query{
    user(id: ID!): User
    tasks(id:ID!) :[Task]
}

type Mutation{

    registerUser(registerInput:RegisterInput): User
    loginUser(loginInput:LoginInput): User

    addTask(taskInput:TaskInput,userId:String!) : Task
    deleteTask(id: ID!): Task
    updateTask(id: ID!, taskInput: TaskInput): Task
}

`