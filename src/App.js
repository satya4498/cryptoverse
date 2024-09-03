import React,{useEffect,useState} from "react";
import { Link, Route, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './Components';
import Login from './Pages/Login';
import Logout from "./Pages/Logout";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css';
import { useAuth } from './api/AuthContext';
import Cookie from 'js-cookie'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { isAuthenticated } = useAuth();
  const token = Cookie.get('token');
  useEffect(()=> {
    if(token || isAuthenticated) {
        setIsLoggedIn(true)
      }
  },[isAuthenticated, token])
  return (
    <div className="app">
      {isLoggedIn && (
        <div className="navbar">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
              <Route exact path="/" element={<ProtectedRoute Component={Homepage} path='/' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route exact path="/cryptocurrencies" element={<ProtectedRoute Component={Cryptocurrencies} path='/cryptocurrencies' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
              <Route exact path="/Exchanges" element={<ProtectedRoute Component={Exchanges} path='/Exchanges' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
              <Route exact path="/crypto/:coinid" element={<ProtectedRoute Component={CryptoDetails} path='/crypto/:coinid' />} />
              <Route exact path="/logout" element={<ProtectedRoute Component={Logout} path='/' isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
              <Route exact path="/news" element={<ProtectedRoute Component={News} path='/news' />} />
            </Routes>
          </div>
        </Layout>
        {isLoggedIn && (
          <div className="footer">
            <Typography.Title level={3} style={{ color: "#ffffff" }}>
              &copy; 2024 Cryptoverse. All rights reserved.
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/Exchanges">Exchanges</Link>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
