import React from 'react'
import {useAuth} from '../api/AuthContext'
import Login from "../Pages/Login"
import Cookies from 'js-cookie'

const ProtectedRoute = ({Component,path,...rest}) => {
    
    const {isAuthenticated } = useAuth();
    const user = Cookies.get('token')
  return (<>{(isAuthenticated || user)?<Component path={path} {...rest}/>:<Login path={path}/>}</>)
}

export default ProtectedRoute