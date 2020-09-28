import React, { useState } from 'react';
import logo from '../Images/logo.png'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Alert,
  NavItem, InputGroup, InputGroupAddon, InputGroupText, Input, Button
} from 'reactstrap';
import { Search, CartFill, CartCheckFill, PersonCircle } from 'react-bootstrap-icons'
import AddProduct from './AddProduct'
import './topbar.css'


const TopBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.clear()
    window.location.pathname = "/login"
  }


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} width="125" alt="logo"></img>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="navStyle">

            <NavItem className="mr-md-5 m-2 invisible">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Search />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search for Products" />
              </InputGroup>
            </NavItem>

            <NavItem className="ml-md-3 m-2">
              <AddProduct />
            </NavItem>

            <NavItem className="ml-md-3 m-2">
              <Button outline color="success" onClick={() => window.location.pathname = "/wishlist"}>
                <CartFill />&nbsp; My Wishlist
              </Button>
            </NavItem>


            <NavItem className="ml-md-3 m-2">
              <Button color="primary" onClick={() => window.location.pathname = "/myitems"}
              ><CartCheckFill />&nbsp; My Items
              </Button>
            </NavItem>
          </Nav>


          <Alert color="success" className="my-auto">
            <PersonCircle />&nbsp;&nbsp;&nbsp; Welcome {localStorage.getItem("name")}
          </Alert>

          <Button color="secondary" onClick={logout}>Logout</Button>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopBar;