import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import Logout from "./AuthPages/Logout";

function NavbarTop(props) {
  console.log(props);

  const logoutHandler = (e) => {
    Logout();
  };

  const clickHandler = () => {
    props.setLocation(0);
  };

  console.log(props.guestUser);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="sticky"
      >
        <Navbar.Brand href="/">Video Game Catalog</Navbar.Brand>
        {props.guestUser ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto" aria-controls="responsive-navbar-nav">
                <Nav.Link href="register" onClick={(e) => clickHandler}>
                  Register
                </Nav.Link>
                <Nav.Link href="login" onClick={(e) => clickHandler}>
                  Log In
                </Nav.Link>
                <Nav.Link href="dashboard">Continue as Guest</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link href="/" onClick={(e) => logoutHandler(e)}>
              Log Out
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
}

export default NavbarTop;
