export interface RegisterType {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface LoginType {
    email:string,
    password:string
}

export interface UserType{
    username:string,
    email:string
}
export interface TaskType{
    // id:string,
    name:string,
    description:string,
    status:string,

    userId:string,
    createdBy:string
    // user:UserType
}