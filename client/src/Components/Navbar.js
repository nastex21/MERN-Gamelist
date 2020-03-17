import React, { useState, useEffect } from "react";
import { Nav, Navbar } from 'react-bootstrap';

export default function NavbarTop() {
    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/">Video Game Catalog</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="register">Register</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="login">Log In</Nav.Link>
                    <Navbar.Text >/</Navbar.Text>
                    <Nav.Link href="dashboard">Continue as Guest</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}