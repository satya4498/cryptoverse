import { Input,Typography,Button, } from "antd"; 
import React,{useState,useEffect} from 'react'
import {useAuth} from "../api/AuthContext"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth()
    useEffect(()=>{
        const user = Cookies.get('user')
        console.log(user)
        if(user){
            navigate(props.path)
            login(user)
        }
    },[login,navigate,props.path])
    
  return (
    <div>
        <Typography.Title level={2}>Welcome To CryptoVerse</Typography.Title>
        <Input onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
        <Input onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='password' />
        <Button onClick={()=>{
            login({username,password})
            navigate(props.path || '/')
            }} 
    type='primary'>Login</Button>
    </div>
  )
}

export default Login