import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { env } from '../Environments'


const DeleteProduct = (props) => {
  const [modal, setModal] = useState(false);
  const [sendFlag, setSendFlag] = useState(false);

  const toggleModal = () => setModal(!modal);
  const notifyFail = () => toast.error("Secret Key is Wrong!", {
    position: "top-center",
    delay: 100,
    autoClose: 1000
  });

  const notifySuccess = () => toast.success("Successfully Delete the Listing !", {
    position: "top-center",
    delay: 100,
    autoClose: 1000
  });

  useEffect(() => {
    if (sendFlag) {
      setSendFlag(false)
      axios.delete(`${env.URL}/${props.id}`).then((res) => {
        console.log(res.data.inserted)
        toggleModal()

        if (res.data.deleted === "true") {
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
      <Button className="mx-2" color="danger" onClick={toggleModal}>Delete Listing</Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <Alert color="warning">
          <ModalHeader toggle={toggleModal} style={formHead}>
            <h3> Delete the Listing </h3>
          </ModalHeader>
        </Alert>
        <ModalBody>
          <Form>
            <FormGroup>
              <Button color="success" onClick={() => setSendFlag(true)}>Confirm</Button>{' '}
              <Button color="danger" onClick={toggleModal}>Cancel</Button>
            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>
    </div>
  );
}

export default DeleteProduct;