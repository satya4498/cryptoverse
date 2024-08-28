import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, FundOutlined, BulbOutlined, LoginOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'
import './Navbar.css'
import { useAuth } from '../api/AuthContext'
import Cookies from 'js-cookie'
const Navbar = () => {
    const { logout,isAuthenticated } = useAuth()
    const cookies = Cookies.get('user')
    return (
        <div className='navbar-container'>
            <div className='logo-container'>
                <Avatar shape="circle" className='avatar' src={icon} size="large" />
                <Typography.Title level={3} className='logo'>
                    <Link to='/'>Cryptoverse</Link>
                </Typography.Title>
            </div>
            <div className='menu-container'>
                <Menu theme='dark' style={{height:"100vh"}}>
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to='/exchanges'>Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to='/news'>News</Link>
                    </Menu.Item>
                    {cookies && 
                    <Menu.Item icon={<LoginOutlined/>}>
                        <Link to='/logout'>Logout</Link>
                    </Menu.Item>}
                </Menu>
            </div>
        </div>
    )
}

export default Navbar