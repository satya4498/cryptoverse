import { Input,Typography,Button,Skeleton } from "antd"; 
import React,{useState,useEffect} from 'react'
import {useAuth} from "../api/AuthContext"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import './pages.css'
import {getUser} from '../api/userService'


const Login = (props) => {
  
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
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
        setError(null)
      }
    },[isAuthenticated])
    const loginHandler = async ()=>{
      const userRes = await getUser({
        email:username,
        password
    }) 

    if(userRes){
      setError(null)
        login(userRes)
        setLoading(true)
        navigate(props.path || '/')
    }else{
      setLoading(false)
      setError('Invalid credentials!!')
    }
  }
  return (
    <div>
      { loading?<Skeleton loading={loading} active={loading}/>:
      <div className="login-container">
        <Typography.Title level={2}>Welcome To CryptoVerse</Typography.Title>
        <Input className="input" onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
        <Input className="input" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' type='password' />
        <Button className="login-button" onClick={loginHandler} type='primary'>Login</Button>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
    <Button type="link" className="alt-button" onClick={()=>navigate('/signup')}>New user? Sign Up</Button>
    </div>
    }
    </div>
  )
}

export default Login