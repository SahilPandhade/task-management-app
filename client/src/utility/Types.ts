export interface RegisterType {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface LoginType {
    email: string,
    password: string
}

export interface UserType {
    username: string,
    email: string
}
export interface TaskType {
    name: string,
    description: string,
    status: string,
    user:{
        username:string
    },
    userId: string,
    _id:string
}