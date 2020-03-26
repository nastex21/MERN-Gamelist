import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'; 
import Logout from './AuthPages/Logout';
import { withRouter } from 'react-router';

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
            <Navbar bg="dark" variant="dark" fixed="sticky">
                <NavbarBrand href="/">Video Game Catalog</NavbarBrand>
                <Nav className="ml-auto">
                    {props.guestUser ? 
                    <>
                    <Nav.Link href="register" onClick={e => clickHandler}>Register</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="login" onClick={e => clickHandler}>Log In</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="dashboard">Continue as Guest</Nav.Link>
                    </>
                    : 
                    <Nav.Link href="/" onClick={e=> logoutHandler(e)}>Log Out</Nav.Link>
                    }
                </Nav>
            </Navbar>
        </>
    )
}

export default NavbarTop;