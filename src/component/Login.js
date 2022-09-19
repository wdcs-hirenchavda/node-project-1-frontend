import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
function Login() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem('user');
      if(auth){
        navigate('/')
      }
    
      })

    const login =async()=>{
        let user = await axios.post('http://localhost:5000/login',{
            email:email,
            password:password,
          });
          // console.log("user",user.data.name);
          
          if(user.data.auth){
            localStorage.setItem('user',JSON.stringify(user.data.user));
            localStorage.setItem('token',JSON.stringify(user.data.auth));
            navigate('/')
          }
          else{
            alert("Please enter valid email and password")
          }
    }
  return (
    <div className='register' >
      <h3> Login Here</h3>
      <input className='inputBox'value={email} type="email" placeholder = "Enter your email" onChange={(e)=>{setEmail(e.target.value);}}  />
      <input  className='inputBox' value={password} type="password" placeholder = "Enter your Password" onChange={(e)=>{setPassword(e.target.value);}}  />
      <button className='appButton' onClick={login} type='button'>Login</button>
    </div>
  )
}

export default Login
