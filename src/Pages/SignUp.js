import { Input, Typography, Button } from "antd"; 
import React, { useState } from 'react';
import { useAuth } from "../api/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import './pages.css'; // Import the CSS file

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [formdata, setFormData] = useState({});
    const [errMsg, setErrorMsg] = useState('')
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleFormdata = (name, value) => {
        setFormData({...formdata, [name]: value });
    };
    const signUpHandler = () => {
        if(!formdata.name ||!formdata.phone ||!formdata.email ||!formdata.password){
            setErrorMsg('Please fill all fields')
            return
        }
        if(formdata.password.length < 8){
            setErrorMsg('Password should be at least 8 characters long');
            return
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formdata.email)){
            setErrorMsg('Please enter a valid email address');
            return;
        }
        if(formdata.phone.length < 10 || formdata.phone.length > 13){
            setErrorMsg('Please enter a valid phone number');
            return;
        }
        if(formdata.password!==formdata.confirmPassword){
            setErrorMsg('Passwords do not match');
            return;
        }
        setErrorMsg('')
        setLoading(true);
        signUp(formdata);
        setLoading(false);
        navigate('/'); 
    }
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
                onClick={signUpHandler}
            >
                Sign Up
            </Button>
            {errMsg && <Typography.Text style={{color:"red",margin:"5px",fontWeight:500}} type="danger">{errMsg}</Typography.Text>}
            <Link className="signup-link" to="/login">
                Already have an account? Login
            </Link>
        </div>
    );
};

export default SignUp;
