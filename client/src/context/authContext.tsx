import jwtDecode from "jwt-decode"
import { createContext, useReducer } from "react"
interface AuthType {
    user:any | null
}
interface AuthContextType {
    user: any | null
    login: (userData:any)=>void
    logout: ()=>void
}
type ActionType = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

const initialState:AuthType = {
    user: null,

}
const encryptedToken = localStorage.getItem("token")
if (encryptedToken ) {
    try {
        const decodedToken = jwtDecode(encryptedToken)

        const { exp } = decodedToken as {
            exp: number;
        };
        if (exp * 1000 < Date.now()) {
            localStorage.removeItem("token")
        } else {  
            // initialState.user = decodedToken as UserDataType
            initialState.user = decodedToken as any
        }
    } catch (e) {
        console.log("error decoding token: ", e)
    }
}

const AuthContext = createContext<AuthContextType>({
    user: null,
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
        console.log("inside the login of context:",userData)
        localStorage.setItem("token",userData.token)
        dispatch({
            type: 'LOGIN',
            payload: {...userData,user_id:userData._id}
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