import React,{useState,useEffect} from "react";
import { Switch, Link, Route, Routes } from 'react-router-dom'
import { Layout, Typography, Spacer, Space } from 'antd'
import { Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News } from './Components'
import Login from './Pages/Login'
import Logout from "./Pages/Logout";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<ProtectedRoute Component={Homepage} path='/'/>} />
              <Route exact path="/cryptocurrencies" element={<ProtectedRoute Component={Cryptocurrencies} path='/cryptocurrencies'/>} />
              <Route exact path="/Exchanges" element={<ProtectedRoute Component={Exchanges} path='/Exchanges'/>} />
              <Route exact path="/crypto/:coinid" element={<ProtectedRoute Component={CryptoDetails} path='/crypto/:coinid'/>} />
              <Route exact path="/logout" element={<ProtectedRoute Component={Logout} path='/'/>} />
              <Route exact path="/news" element={<News />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </Layout>
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
      </div>
    </div>
  );
}

export default App;
