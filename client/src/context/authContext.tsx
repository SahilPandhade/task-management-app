import jwtDecode from "jwt-decode"
import { createContext, useReducer } from "react"
interface AuthType {
    user: UserDataType | null
}
interface UserDataType{
    token:string,
    email:string,
    password:string
}
interface AuthContextType {
    user: string | null
    login: (userData:UserDataType)=>void
    logout: ()=>void
}
type ActionType = { type: "LOGIN"; payload: UserDataType } | { type: "LOGOUT" };

const initialState: AuthType = {
    user: null
}
const encryptedToken = localStorage.getItem("token")

if (encryptedToken) {
    try {
        const decodedToken = jwtDecode(encryptedToken)
        const { exp } = decodedToken as {
            exp: number;
        };
        if (exp * 1000 < Date.now()) {
            localStorage.removeItem("token")
        } else {
            initialState.user = decodedToken as UserDataType
        }
    } catch (e) {
        console.log("error decoding token: ", e)
    }
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: (userData:UserDataType) => { },
    logout: () => { }
})

function authReducer(state:AuthType, action:ActionType) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

function AuthProvider(props:any){
    const [state,dispatch] = useReducer(authReducer,initialState)

    const login = (userData:UserDataType)=>{
        localStorage.setItem("token",userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = ()=>{
        localStorage.removeItem("token");
        dispatch({type:"LOGOUT"})
    }

    return (
        <AuthContext.Provider 
        value={{user:state.user,login,logout}}
        {...props}
        />
    )
}

export {AuthContext,AuthProvider}