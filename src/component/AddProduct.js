import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router';
// import Swal from 'sweetalert';
import Swal from "sweetalert2";

function AddProduct() {
    const navigate = useNavigate();
  const auth =JSON.parse( localStorage.getItem('user'))._id;

    const [name,setName]= useState('');
    const [price, setPrice]= useState();
    const [category, setCategory]= useState('');
    const [company, setCompany]= useState('');
    const [error, setError]= useState(false);
    const addProduct = async()=>{
        if(!name || !price || !category || !company){
            setError(true);
           return false;
        } else{

            let product = await axios.post(`http://localhost:5000/add-product`,{
                name:name,
                price:price,
                category:category,
                userId:auth,
                company:company,
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
                
            })
        if(product.data){
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your product has been added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
                navigate('/')
            }
        }
    }


  return (
    <div className='product' >
        <h1>Add Product</h1>
      <input type="text" placeholder='Enter product name' className='inputBox' onChange={(e)=>setName(e.target.value)} />
     {error && !name && <span className='invalid-input' >Enter name</span>}

      <input type="number" placeholder='Enter product price' className='inputBox' onChange={(e)=>setPrice(e.target.value)} />
      {error && !price && <span className='invalid-input' >Enter price</span>}

      <input type="text" placeholder='Enter product category' className='inputBox' onChange={(e)=>setCategory(e.target.value)} />
      {error && !category && <span className='invalid-input' >Enter category</span>}

      <input type="text" placeholder='Enter product company' className='inputBox' onChange={(e)=>setCompany(e.target.value)} />
      {error && !company && <span className='invalid-input' >Enter company</span>}


      <button type="submit" className='appButton' onClick={addProduct} >Add Product</button>
    </div>
  )
}

export default AddProduct
