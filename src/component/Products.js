import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Form from 'react-bootstrap/Form';
function Products() {
  const [product, setProduct] = useState([]);
  // const navigate = useNavigate()
  const prod = ()=>{
    axios
    .get(`http://localhost:5000/products`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    .then((response) => setProduct(response.data));
  }

  useEffect(() => {
    prod();
    // axios
    //   .get(`http://localhost:5000/products`)
    //   .then((response) => setProduct(response.data));
  }, []);

  const deleteProduct = async(id)=>{
    let deleteitems = await axios.delete(`http://localhost:5000/product/${id}`,{ headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
    }});
    if(deleteitems.data.deletedCount === 1){
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Your product has been deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
      prod();
    };
    
  }
  const searchHadler = async (e)=>{
    let key = e.target.value;
    if(key){

      let res = await axios.get(`http://localhost:5000/search/${key}`,{ headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }})
      if(res){
  
        setProduct(res.data)
      }
    }else{
      prod();
    }
  }

  return (
    <div>
      <Container>
          <h1>Welcome to iStore</h1>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={searchHadler}
            />
       
          </Form>
          <div className="my-4">
          <Row>
          {product.length > 0 ? product.map((items) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Header>Product Name: {items.name}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Price: {items.price}</ListGroup.Item>
                    <ListGroup.Item>Category: {items.category}</ListGroup.Item>
                    <ListGroup.Item>Company: {items.company}</ListGroup.Item>
                  </ListGroup>
                  <Button className="btn btn-danger" onClick={()=>{deleteProduct(items._id)}}  >Delete</Button>
                  <Link to={'/update/'+items._id} >update</Link>
                </Card>
                <br></br>
              </Col>
            );
          })
          :
          <h1>No Result found</h1>
        }
        </Row>
          </div>
      </Container>
    </div>
  );
}

export default Products;
