import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { env } from '../Environments'

toast.configure()
const EditProduct = (props) => {
    const [modal, setModal] = useState(false);
    const notifyFail = () => toast.error("Some Error Occured, try again !", {
        position: "top-center",
        delay: 100,
        autoClose: 1000
    });

    const notifySuccess = () => toast.success("Successfully Updated !", {
        position: "top-center",
        delay: 100,
        autoClose: 1000
    });

    const [productDetails, setDetails] = useState({
        product: props.product,
        price: props.price,
        description: props.desc,
        contact: props.contact
    });

    const [sendFlag, setSendFlag] = useState(false);

    const toggleModal = () => setModal(!modal);


    useEffect(() => {
        if (sendFlag) {
            setSendFlag(false)
            console.log(productDetails)
            axios.patch(`${env.URL}/${props.id}`, productDetails).then((res) => {
                console.log(res)
                toggleModal()
                if (res.data.updated === "true") {
                    notifySuccess()
                    setTimeout(() => {
                        window.location.pathname = "/myitems"
                    }, 1000)
                }
                else {
                    notifyFail()
                }
            })
        }

    }, [sendFlag])


    const formHead = {
        fontWeight: "600",
        fontFamily: "Helvetica"
    }


    return (
        <div>
            <Button className="mx-2" color="warning" onClick={toggleModal}>Edit</Button>
            {/* <ToastContainer /> */}

            {/* <NavLink style={heading}>Sell Item</NavLink> */}

            <Modal isOpen={modal} toggle={toggleModal}>
                <Alert color="warning">
                    <ModalHeader toggle={toggleModal} style={formHead}>
                        <h3> Edit the Product </h3>
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
                            <Label for="contact">Contact Number</Label>
                            <Input type="text" value={productDetails.contact} onChange={e => setDetails({ ...productDetails, contact: e.target.value })} placeholder="Enter your contact number " />

                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => setSendFlag(true)}>Edit Product</Button>{' '}
                    <Button color="danger" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditProduct;