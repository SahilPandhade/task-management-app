import jwtDecode from "jwt-decode"
import { createContext, useReducer } from "react"
interface AuthType {
    // user: UserDataType | null,
    user:any | null
}

// interface UserDataType{
//     // id:string
//     id:string,
//     _id:string,
//     username:string,
//     token:string,
//     email:string,
//     password:string
// }
interface AuthContextType {
    // user: UserDataType | null
    user: any | null
    // login: (userData:UserDataType)=>void
    login: (userData:any)=>void
    logout: ()=>void
}
// type ActionType = { type: "LOGIN"; payload: UserDataType } | { type: "LOGOUT" };
type ActionType = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

const initialState:AuthType = {
    user: null,

}
const encryptedToken = localStorage.getItem("token")
if (encryptedToken ) {
    try {
        const decodedToken = jwtDecode(encryptedToken)
        console.log("decoded user",decodedToken)

        const { exp } = decodedToken as {
            exp: number;
        };
        if (exp * 1000 < Date.now()) {
            localStorage.removeItem("token")
        } else {  
            // initialState.user = decodedToken as UserDataType
            initialState.user = decodedToken as any
            console.log("initial state user: ",initialState.user)
        }
    } catch (e) {
        console.log("error decoding token: ", e)
    }
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    // login: (userData:UserDataType) => { },
    login: (userData:any) => { },
    logout: () => { }
})

function authReducer(state:AuthType, action:ActionType):AuthType {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

function AuthProvider(props:any){
    const [state,dispatch] = useReducer(authReducer,initialState)
    const login = (userData:any)=>{
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