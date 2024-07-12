import React, { useState } from 'react';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const check = () => {
    if (email.length === 0) {
      toast.error('Email cannot be empty');
      return false;
    }
    if (password.length === 0) {
      toast.error('Password cannot be empty');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (check()) {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      if (response.data.msg === "Login successfully") {
        localStorage.setItem('userinfo', JSON.stringify(response.data.user));
        localStorage.setItem('jwt', JSON.stringify(response.data.token));
        toast.success(response.data.msg, {
          onClose:()=>{
            navigate('/home');
          },
          autoClose:1000
        });
      } else {
        toast.error(response.data.msg);
      }
    }
  };

  return (
    <div className='body'>
      <div className='box'>
        <div className='header'>
          <div className='login'>Login Form</div>
          <div className='underline'></div>
        </div>
        <form className='inputs' onSubmit={handleSubmit}>
          <div className='input'>
            <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className='icon' /></label>
            <input type='email' id='email' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <label htmlFor="password"><FontAwesomeIcon icon={faLock} className='icon' /></label>
            <input type='password' id='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='submit'>
            <button type='submit'>Submit</button>
          </div>
          <div className='register'>
            <div>If you don't have an account:</div>
            <div className='register1' onClick={() => navigate('/register')}>Register</div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
