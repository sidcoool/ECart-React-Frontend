import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from "react-images-upload";
import Resizer from 'react-image-file-resizer';

const AddProduct = (props) => {
  const [modal, setModal] = useState(false);

  const [productDetails, setDetails] = useState({
    product: "",
    price: 0,
    description: "",
    email: "",
    secret_code: ""
  });

  const [sendFlag, setSendFlag] = useState(false);


  const toggleModal = () => setModal(!modal);
  const notifyFail = () => toast.error("Sorry, some error occured try adding again!", {
    position: "top-center",
    delay: 1000,
    autoClose: 2000
  });

  const notifySuccess = () => toast.success("Successfully Added Product !", {
    position: "top-center",
    delay: 1000,
    autoClose: 2000
  });

  const [picFile, setPicture] = useState({

  });
  // let picFile = {}

  

  const onDrop = picture => {
    Resizer.imageFileResizer(picture[0], 500, 500, 'JPEG', 75 , 0,
      (uri) => {
        console.log(uri);
        setPicture(uri)
      },
      'base64'
    );
    // setPicture(picture)
  };


  useEffect(() => {
    if (sendFlag) {
      setSendFlag(false)
      console.log(picFile)
      // console.log(picFile.toDataURL())
      // https://esellapi.herokuapp.com/product

      axios.post("https://esellapi.herokuapp.com/product", {...productDetails, imgURL: picFile}).then((res) => {
        console.log(res.data.inserted)
        toggleModal()

        if (res.data.inserted === "true") {
          notifySuccess()
          setTimeout(() => {
            window.location.reload(false)
          }, 3000)
        }
        else {
          notifyFail()
        }
        // setProducts(res.data)
      })
    }

  }, [sendFlag, picFile])


  const heading = {
    fontSize: "25px",
    fontWeight: "bold",
    fontFamily: "Garamond",
    borderRadius: "10px",
  }

  const formHead = {
    fontWeight: "600",
    fontFamily: "Helvetica"
  }




  return (
    <div>
      <Button color="info" style={heading} onClick={toggleModal}>Sell Item</Button>
      {/* <NavLink style={heading}>Sell Item</NavLink> */}

      <Modal isOpen={modal} toggle={toggleModal}>
        <Alert color="warning">
          <ModalHeader toggle={toggleModal} style={formHead}>
            <h3> Add a Product </h3>
          </ModalHeader>
        </Alert>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="product">Product</Label>
              <Input type="text" value={productDetails.product} onChange={e => setDetails({ ...productDetails, product: e.target.value })} placeholder="Whats your product" />
            </FormGroup>

            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="number" value={productDetails.price} onChange={e => setDetails({ ...productDetails, price: e.target.value })} placeholder="What price you expect" />
            </FormGroup>

            <FormGroup>
              <Label for="desc">Describe your Product</Label>
              <Input type="text" value={productDetails.description} onChange={e => setDetails({ ...productDetails, description: e.target.value })} placeholder="Enter an attractive description " />
            </FormGroup>


            <FormGroup>
              <Label for="email">Contact Email</Label>
              <Input type="email" value={productDetails.email} onChange={e => setDetails({ ...productDetails, email: e.target.value })} placeholder="Enter your conatct email " />

            </FormGroup>

            <FormGroup>
              <Label for="password">Enter your Secret Key</Label>
              <Input type="password" value={productDetails.secret_code} onChange={(e) => {
                setDetails({ ...productDetails, secret_code: e.target.value })
                console.log(productDetails)
              }} placeholder="Enter an Secret Key for deleing or editing your listing " />
            </FormGroup>

            <ImageUploader
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
              maxFileSize={15242880}
              singleImage={true}
              withPreview={true}
              buttonText="Upload Product Image"
            />
            {/* <input type="file" onChange={(e) => {
              setPicture(e.target.files[0])
            }} /> */}

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => setSendFlag(true)}>Add Product</Button>{' '}
          <Button color="danger" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddProduct;