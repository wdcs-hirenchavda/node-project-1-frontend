import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

function Singup() {
  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const navigate=useNavigate()
  useEffect(() => {
  const auth = localStorage.getItem('user');
  if(auth){
    navigate('/')
  }

  })
  const signUp =async ()=>{
    let user = await axios.post('http://localhost:5000/register',{
      name:name,
      email:email,
      password:password,
    });
    // user = await user.json()
    // console.log(user);
    if(user){

      localStorage.setItem('user',JSON.stringify(user.data.result));
      localStorage.setItem('token',JSON.stringify(user.data.auth));
      navigate('/')
    }
  }

  return (

    <div className='register' >
      <h3> Register Here</h3>
      <input className='inputBox' value={name}  type="text" placeholder = "Enter your Name" onChange={(e)=>{setName(e.target.value);}} />
      <input className='inputBox' value={email} type="email" placeholder = "Enter your email" onChange={(e)=>{setEmail(e.target.value);}}  />
      <input  className='inputBox' value={password} type="password" placeholder = "Enter your Password" onChange={(e)=>{setPassword(e.target.value);}}  />
      <button className='appButton' onClick={signUp} type='button'>Signup</button>
    
    
    </div>
    
  )
}

export default Singup
