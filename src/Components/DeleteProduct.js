import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteProduct = (props) => {
  const [modal, setModal] = useState(false);

  const [code, setCode] = useState("");

  const [sendFlag, setSendFlag] = useState(false);

  const toggleModal = () => setModal(!modal);
  const notifyFail = () => toast.error("Secret Key is Wrong!", {
    position: "top-center",
    delay: 1000,
    autoClose: 2000
  });

  const notifySuccess = () => toast.success("Successfully Delete the Listing !", {
    position: "top-center",
    delay: 1000,
    autoClose: 2000
  });

  useEffect(() => {
    if (sendFlag) {
      setSendFlag(false)
      axios.delete(`https://esellapi.herokuapp.com/product/?id=${props.id}&key=${code}`).then((res) => {
        console.log(res.data.inserted)
        toggleModal()

        if (res.data.deleted === "true") {
          notifySuccess()
          setTimeout(() => {
            window.location.reload(false)
          }, 3000)
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
              <Label for="password">Enter your Secret Key</Label>
              <Input type="password" value={code} onChange={e => setCode(e.target.value)} placeholder="Enter your Secret Key to authorize the Delete " />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => setSendFlag(true)}>Confirm</Button>{' '}
          <Button color="danger" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteProduct;