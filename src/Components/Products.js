import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import { env } from '../Environments'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import nodata from '../Images/nodata.jpg'
import TopBar from './TopBar'

const Product = ({ id, name, price, desc, contact, email, imgURL }) => {


  const notifySuccess = () => toast.success("Successfully Added to Wishlist !", {
    position: "top-center",
    delay: 100,
    autoClose: 1500
  });

  const cardStyle = {
    maxWidth: "550px",
    margin: "50px 10px",
    backgroundColor: "#fafafa",
    borderRadius: "20px"
  }

  const addToWishlist = () => {
    axios.post(`${env.URL}/wishlist`, { id: id, email: localStorage.getItem("email") }).then((d) => {
      console.log(d)
      notifySuccess()
    })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Card style={cardStyle}>
      <CardImg top src={imgURL} style={{ height: "300px", maxWidth: "500px" }} alt="Card image cap" />
      <CardBody style={{ textAlign: "left", fontSize: "20px" }}>
        <CardTitle><b>Product: </b>{name}</CardTitle>
        <CardText><b>Price: </b>{price}</CardText>
        <CardText><b>Description: </b>{desc}</CardText>
        <CardText><b>Contact: </b>{contact}</CardText>
        <div className="d-flex justify-content-end">
          <Button color="success" onClick={() => addToWishlist(id, email)}>Add to Wishlist</Button>
        </div>
      </CardBody>
    </Card>
  );
};


const ProductList = () => {
  const [productL, setProducts] = useState([])
  const [fetched, setFetch] = useState(false)

  useEffect(() => {
    axios.get(env.URL).then((res) => {
      console.log(res)
      setProducts(res.data)
      setFetch(true)
    })
  }, [])

  if (productL.length !== 0) {
    return (
      <div>
        <TopBar/>
        <div className="container-fluid">
          <div className="d-flex flex-wrap justify-content-around">
            {
              productL.map(p => <Product key={p._id} id={p._id} name={p.product} price={p.price} desc={p.description} contact={p.contact} email={p.email} imgURL={p.imgURL} />)
            }
          </div>
        </div>
      </div>
    )
  }
  else if (!fetched) {
    return (
      <div>
        <TopBar />
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
      </div>
    )
  }
  else {
    return (
      <div>
        <TopBar />
        <img src={nodata} />
      </div>
    )
  }

}



export default ProductList;