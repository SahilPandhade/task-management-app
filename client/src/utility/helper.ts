import { LoginType, RegisterType } from "./Types"

export const validateRegistration = (values: RegisterType) => {
    let errors = { username: '', email: '', password: '', confirmPassword: '' }
    if (!values.username) {
        errors.username = 'Username required'
    }
    if (!values.email) {
        errors.email = 'Email is required!'
    } else if (!isValidEmail(values.email)) {
        errors.email = 'Invalid email address!'
    }
    if (!values.password) {
        errors.password = 'Password is required!'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm password!'
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
}

export const validateLoginForm = (values: LoginType) => {
    let errors = { email: '', password: '' }
    if (!values.email) {
        errors.email = 'Email is required!'
    } else if (!isValidEmail(values.email)) {
        errors.email = 'Invalid email address!'
    }
    if (!values.password) {
        errors.password = 'Password is required!'
    }
    return errors;
}

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// export enum statusCodes{
//     NOT_STARTED='Not Started',
//     IN_PROGRESS='In Progress',
//     COMPLETED='Completed'
// }
export const statusCodes = {
    NOT_STARTED: { value: 'Not Started', color: '#FF0000' },
    IN_PROGRESS: { value: 'In Progress', color: '#FFA500' },
    COMPLETED: { value: 'Completed', color: '#008000' }
  };