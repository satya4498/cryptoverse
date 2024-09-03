import { Input,Typography,Button,Skeleton } from "antd"; 
import React,{useState,useEffect} from 'react'
import {useAuth} from "../api/AuthContext"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import './login.css'



const Login = (props) => {
  
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login,isAuthenticated} = useAuth()
    useEffect(()=>{
        const user = Cookies.get('token')
        // console.log(user)
        if(user){
            login(user)
            navigate(props.path)
        }
    },[login,navigate,props.path])
    useEffect(()=>{
      if(isAuthenticated){
        setLoading(false)
      }
    },[isAuthenticated])

  return (
    <div>
      { loading?<Skeleton loading={loading} active={loading}/>:
      <div className="login-container">
        <Typography.Title level={2}>Welcome To CryptoVerse</Typography.Title>
        <Input className="input" onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
        <Input className="input" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='password' />
        <Button className="login-button" onClick={()=>{
            login({username,password})
            setLoading(true)
            navigate(props.path || '/')
            }} 
    type='primary'>Login</Button>
    </div>
    }
    </div>
  )
}

export default Login