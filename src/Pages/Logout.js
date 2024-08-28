import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useAuth } from '../api/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
  const [count, setCount] = useState(5);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      navigate('/');
    }
    return () => {
      clearInterval(timer);
    };
  }, [count, logout, navigate]);

  return (
    <Typography.Title>
      Logged out Successfully & You will be redirected to the login page in {count} seconds
    </Typography.Title>
  );
};

export default Logout;
