import { Input, Typography, Button } from "antd"; 
import React, { useState } from 'react';
import { useAuth } from "../api/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import './pages.css'; // Import the CSS file

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [formdata, setFormData] = useState({});
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleFormdata = (name, value) => {
        setFormData({...formdata, [name]: value });
    };

    return (
        <div className="signup-container">
            <Typography.Title className="signup-title">Sign Up</Typography.Title>
            <Input
                className="signup-input"
                placeholder="Name"
                type="text"
                name="name"
                onChange={(e) => handleFormdata(e.target.name, e.target.value)}
            />
            <Input
                className="signup-input"
                placeholder="Phone Number"
                name="phone"
                maxLength={13}
                minLength={10}
                type="tel"
                onChange={(e) => handleFormdata(e.target.name, e.target.value)}
            />
            <Input
                className="signup-input"
                placeholder="Email"
                name="email"
                type="email"
                onChange={(e) => handleFormdata(e.target.name, e.target.value)}
            />
            <Input
                className="signup-input"
                placeholder="Password"
                name="password"
                type="password"
                onChange={(e) => handleFormdata(e.target.name, e.target.value)}
            />
            <Input
                className="signup-input"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={(e) => handleFormdata(e.target.name, e.target.value)}
            />
            <Button
                className="signup-button"
                type="primary"
                loading={loading}
                onClick={() => {
                    setLoading(true);
                    signUp(formdata);
                    setLoading(false);
                    navigate('/'); 
                }}
            >
                Sign Up
            </Button>
            <Link className="signup-link" to="/login">
                Already have an account? Login
            </Link>
        </div>
    );
};

export default SignUp;
