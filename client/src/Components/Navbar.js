import React from "react";
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'; 
import Logout from './AuthPages/Logout';

function NavbarTop(props) {
    console.log(props);

    const logoutHandler = e => {
        Logout();
    }   


    const clickHandler = () => {
        props.setLocation(0);
    }
     
    console.log(props.guestUser);
    return (
        <>
            <Navbar collapseOnSelect expand="lg"  bg="dark" variant="dark" fixed="sticky">
                <NavbarBrand href="/">Video Game Catalog</NavbarBrand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {props.guestUser ? 
                    <>
                    <Nav.Link href="register" onClick={e => clickHandler}>Register</Nav.Link>
                    <Nav.Link href="login" onClick={e => clickHandler}>Log In</Nav.Link>
                    <Nav.Link href="dashboard">Continue as Guest</Nav.Link>
                    </>
                    : 
                    <Nav.Link href="/" onClick={e=> logoutHandler(e)}>Log Out</Nav.Link>
                    }
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavbarTop;