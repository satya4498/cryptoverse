import React,{createContext,useState,useContext} from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext(null) 

export const AuthProvider = (props)=> {
    const [authState,setAuthState] = useState({
        isAuthenticated:false,
        user:null,
        token:null,
        expiry:null
    })
    const login = (user) => {
        if(user){
            setAuthState(prevState=>{
                return {
                    ...prevState,
                    isAuthenticated:true,
                    user:user,
                    token:`${user.password}#${new Date().getTime()}`,
                }
            })
            Cookies.set('user',JSON.stringify({
                isAuthenticated:true,
                user:user,
                token:`${user.password}#${new Date().getTime()}`,
            }),{expires:2} )
            
            console.log('logged in',user)
        }
    }
    const logout = ()=> {
        setAuthState({
                isAuthenticated:false,
                user:null,
                token:null,
            })
            Cookies.remove('user')
    }
    
    return <AuthContext.Provider value={{...authState,login,logout}}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuth = ()=> {
    return useContext(AuthContext)
}
