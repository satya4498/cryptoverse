import React,{createContext,useState,useContext} from 'react'
import Cookies from 'js-cookie'
import {getUser} from './userService'
export const AuthContext = createContext(null) 

export const AuthProvider = (props)=> {
    const [authState,setAuthState] = useState({
        isAuthenticated:false,
        user:null,
        token:null,
        expiry:null
    })
    const login = async (user) => {
        if(user){
            const userRes = await getUser({
                email:user.username,
                password:user.password
            })
            if(userRes){
            setAuthState(prevState=>{
                return {
                    ...prevState,
                    isAuthenticated:true,
                    user:user,
                    token: userRes?.token,
                }
            })
            // Cookies.set('user',JSON.stringify({
            //     isAuthenticated:true,
            //     user:user
            // }),{expires:2} )
            Cookies.set('token',userRes?.token,{expires:2})
        }
        }
    }
    const logout = ()=> {
        setAuthState({
                isAuthenticated:false,
                user:null,
                token:null,
            })
            // Cookies.remove('user')
            Cookies.remove('token')
    }
    
    return <AuthContext.Provider value={{...authState,login,logout}}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuth = ()=> {
    return useContext(AuthContext)
}