import React, { useEffect } from 'react'
import { Typography } from 'antd'
import { useAuth } from '../api/AuthContext'
import { useNavigate } from 'react-router-dom'
const Logout = (props) => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    useEffect(() =>{
        logout()
        navigate('/')
    },[logout,navigate])
  return (
    <Typography.Title>Logged out Successfully!!</Typography.Title>
  )
}

export default Logout