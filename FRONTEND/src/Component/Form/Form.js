import React, { useState } from 'react'
import './Form.css'
import LeetCodeIcon from '../Photo/Leetcode.png';
import HackerRankIcon from '../Photo/hackerearth.jpg';
import CodeChiefIcon from '../Photo/codechief.jpg';
import CodeForceIcon from '../Photo/codeforce.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {
    const navigate=useNavigate();
    const [Links,setLinks]=useState({
        leetcode:"",
        hackerearth:"",
        codeforces:"",
        codechief:""
    });
    const handlechange=(event)=>{
        setLinks({...Links,[event.target.name]:event.target.value});
    }
    const handlesubmit=async(event)=>{
        event.preventDefault();
        const {leetcode,hackerearth,codeforces,codechief}=Links;
        if(leetcode.length==0||hackerearth.length==0||codeforces.length==0||codechief.length==0)
        {
            toast.error("Fill all the Username")
        }
        else
        {
        const user=JSON.parse(localStorage.getItem('userinfo'));
        const response=await axios.post('http://localhost:8000/forms',{leetcode:leetcode,hackerearth:hackerearth,codeforces:codeforces,codechief:codechief,user:user.userdetails.id});
        if(response.data.msg==="Links added successfully")
        {
            localStorage.removeItem('userinfo')
            localStorage.setItem('userinfo',JSON.stringify(response.data.user));
            toast.success(response.data.msg, {
                onClose:()=>{
                  navigate('/home');
                },
                autoClose:1000
              });
        }
        else
        {
            toast.error(response.data.msg);
        }
        }
    }
  return (
    <div className='form-body'>
        <div className='form-container'>
            <div className='form-header'>
                <div className='form-title'>
                    Online Platform Links
                </div>
            </div>
        <form className='form' onSubmit={(e)=>handlesubmit(e)}>
            <div className='input-form'>
                <label for='leetcode'><img className='leetcode' src={LeetCodeIcon}/></label>
                <input className='url' type='text' id='leetcode' name='leetcode' placeholder='leetcode username' onChange={(e)=>handlechange(e)} />
            </div>
            <div className='input-form'>
                <label for='hackerrank'><img className='hackerrank' src={HackerRankIcon}/></label>
                <input className='url' type='text' id='hackerrank' name='hackerearth' placeholder='hackerrank username' onChange={(e)=>handlechange(e)} />
            </div>
            <div className='input-form'>
                <label for='codeforce'><img className='codeforce' src={CodeForceIcon}/></label>
                <input className='url' type='text' id='codeforce' name='codeforces' placeholder='codeforce username' onChange={(e)=>handlechange(e)} />
            </div>
            <div className='input-form'>
                <label for='codechief'><img className='codechief' src={CodeChiefIcon}/></label>
                <input className='url' type='text' id='codechief' name='codechief' placeholder='codechief username' onChange={(e)=>handlechange(e)} />
            </div>
            <div className='forms-submit'>
                <button className='btn-forms-submit' type='submit'>Submit</button>
            </div>
        </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Form