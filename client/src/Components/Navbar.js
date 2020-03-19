import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'; 
import { withRouter } from 'react-router'

function NavbarTop(props) {
    console.log(props);

    const logoutHandler = e => {
        e.preventDefault();
        console.log("runs");
        console.log(props);
        localStorage.removeItem('jwtToken');
        props.history.push('/login');
    }

     const continueGuest = e => {
        props.enableGuestUser();
    }
     
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <NavbarBrand href="/">Video Game Catalog</NavbarBrand>
                <Nav className="ml-auto">
                    {!props.token ? 
                    <>
                    <Nav.Link href="register">Register</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="login">Log In</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="dashboard" onClick={ e => continueGuest(e)}>Continue as Guest</Nav.Link>
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