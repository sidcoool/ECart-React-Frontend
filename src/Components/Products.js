import React, { useState, useEffect } from 'react';
import axios from 'axios'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct';
import Skeleton from 'react-loading-skeleton';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

const Product = ({ id, name, price, desc, contact, imgURL }) => {

  const cardStyle = {
    maxWidth: "550px",
    margin: "50px 10px",
    backgroundColor: "#fafafa",
    borderRadius: "20px"
  }

  return (
      <Card style={cardStyle}>
        <CardImg top src={imgURL} style={{ height: "300px", maxWidth:"500px" }} alt="Card image cap" />
        <CardBody style={{ textAlign: "left", fontSize: "20px" }}>
          <CardTitle><b>Product: </b>{name}</CardTitle>
          <CardText><b>Price: </b>{price}</CardText>
          <CardText><b>Description: </b>{desc}</CardText>
          <CardText><b>Contact: </b>{contact}</CardText>
          {/* <Button color="danger">Edit</Button> */}
          <div className="d-flex justify-content-end">
            <EditProduct id={id} product={name} price={price} desc={desc} email={contact} />
            <DeleteProduct id={id} />
          </div>
        </CardBody>
      </Card>
  );
};


const ProductList = () => {
  const [productL, setProducts] = useState([])

  useEffect(() => {
    axios.get("https://esellapi.herokuapp.com/product").then((res) => {
      console.log(res)
      setProducts(res.data)
    })
  }, [])

  if (productL.length !== 0) {
    return (
      <div className="container-fluid">
        <div className="d-flex flex-wrap justify-content-around">
            {
              productL.map(p => <Product key={p._id} id={p._id} name={p.product} price={p.price} desc={p.description} contact={p.email} imgURL={p.imgURL} />)
            }
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="row d-flex justify-content-around">
        <div className="my-5">
          <Skeleton count={10} height={5} width={400} />
        </div>

        <div className="my-5">
          <Skeleton count={10} height={5} width={400} />
        </div>

        <div className="my-5">
          <Skeleton count={10} height={5} width={400} />
        </div>

        <div className="my-5">
          <Skeleton count={10} height={5} width={400} />
        </div>
      </div>
    )
  }

}



export default ProductList;