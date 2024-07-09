import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const check = () => {
    if (username.length === 0) {
      toast.error('Username cannot be empty');
      return false;
    }
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
      const response = await axios.post('http://localhost:8000/register', { username, email, password });
      if (response.data.msg === "User registered successfully") {
        localStorage.setItem('userinfo',JSON.stringify(response.data.user));
        localStorage.setItem('jwt',JSON.stringify(response.data.token));
        toast.success('Registered Successfully', {
          onClose: () => {
            navigate('/form');
          },
          autoClose: 1000
        });
      } else {
        toast.error(response.data.msg);
      }
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className='body'>
      <div className='box'>
        <div className='header'>
          <div className='register'>Register Form</div>
          <div className='underline'></div>
        </div>
        <form className='inputs' onSubmit={(e) => handleSubmit(e)}>
          <div className='input'>
            <label htmlFor="username"><FontAwesomeIcon icon={faUser} className='icon' /></label>
            <input type="username" id="username" name="username" placeholder='Usename' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='input'>
            <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className='icon' /></label>
            <input type="email" id="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <label htmlFor="password"><FontAwesomeIcon icon={faLock} className='icon' /></label>
            <input type="password" id="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='submit'>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
