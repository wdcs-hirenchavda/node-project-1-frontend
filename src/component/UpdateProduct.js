import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router';


function UpdateProduct() {
    const navigate = useNavigate()
    const [name,setName]= useState('');
    const [price, setPrice]= useState();
    const [category, setCategory]= useState('');
    const [company, setCompany]= useState('');
    const [proDetail, setProDetail]= useState([]);
    const [error, setError]= useState(false);
    const params = useParams();

    
    useEffect(() => {
        productDetail()
        
    },[])

    const productDetail = async() => {
        let productDetail = await axios.get(`http://localhost:5000/product/${params.Id}`,{ headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
          }})
        setProDetail(productDetail.data)
    }
    const updateProduct = async()=>{
        if(!name || !price || !category || !company){
            setError(true);
           return false;
        } else{

            let product = await axios.put(`http://localhost:5000/product/${params.Id}`,{
                name:name,
                price:price,
                category:category,
                // userId:auth,
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
      <h1>Update Product</h1>
      <input type="text" defaultValue={proDetail.name} placeholder='Enter product name' className='inputBox' onChange={(e)=>setName(e.target.value)} />
     {error && !name && <span className='invalid-input' >Enter name</span>}

      <input type="number" defaultValue={proDetail.price} placeholder='Enter product price' className='inputBox' onChange={(e)=>setPrice(e.target.value)} />
      {error && !price && <span className='invalid-input' >Enter price</span>}

      <input type="text" defaultValue={proDetail.category} placeholder='Enter product category' className='inputBox' onChange={(e)=>setCategory(e.target.value)} />
      {error && !category && <span className='invalid-input' >Enter category</span>}

      <input type="text" defaultValue={proDetail.company} placeholder='Enter product company' className='inputBox' onChange={(e)=>setCompany(e.target.value)} />
      {error && !company && <span className='invalid-input' >Enter company</span>}
      
      <button type="submit" className='appButton' onClick={updateProduct} >update Product</button>
    </div>
  )
}

export default UpdateProduct
