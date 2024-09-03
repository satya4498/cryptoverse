import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { useAuth } from '../api/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const [count, setCount] = useState(5);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    setIsLoggedIn(false);

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [logout, setIsLoggedIn]);

  useEffect(() => {
    if (count === 0) {
      navigate('/login');
    }
  }, [count, navigate]);

  return (
    <Typography.Title>
      Logged out successfully. You will be redirected to the login page in {count} seconds.
    </Typography.Title>
  );
};

export default Logout;
