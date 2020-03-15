import React, { useState, useEffect } from "react";
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

export default function NavbarTop() {

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home">Your Game List Database</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#login">Login</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="#signup">Signup</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}