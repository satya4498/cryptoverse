import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../api/AuthContext'
import Login from "../Pages/Login"
import Cookies from 'js-cookie'

const ProtectedRoute = ({Component,path}) => {
    const {isAuthenticated } = useAuth();
    const user = Cookies.get('token')
  return (<>{(isAuthenticated || user)?<Component path={path}/>:<Login path={path}/>}</>)
}

export default ProtectedRoute