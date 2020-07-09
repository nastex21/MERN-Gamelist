import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "../AuthPages/Logout";

function NavbarTop(props) {
  const logoutHandler = (e) => {
    Logout();
  };

  const clickHandler = () => {
    props.setLocation(0);
  };

  console.log(props.location.pathname);
  return (
    <div className="extendNav w-100">
      <div className="container">
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="sticky"
        >
          <Navbar.Brand href="/">Video Game Catalog</Navbar.Brand>
          {props.guestUser && props.location.pathname == "/dashboard" ? (
            <>
              <Navbar.Text style={{ color: "mediumspringgreen" }}>
                (In Demo Mode)
              </Navbar.Text>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" aria-controls="responsive-navbar-nav">
                  <Nav.Link href="register" onClick={(e) => clickHandler}>
                    Register
                  </Nav.Link>
                  <Nav.Link href="login" onClick={(e) => clickHandler}>
                    Log In
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : props.guestUser && props.location.pathname !== "/dashboard" ? (
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
            <Nav className="w-100 d-flex">
                <Nav.Link className="p-2" href="/dashboard/import" onClick={(e) => logoutHandler(e)}>
                Import
              </Nav.Link>
              <Nav.Link className="p-2" href="/dashboard/search" onClick={(e) => logoutHandler(e)}>
                Add Games
              </Nav.Link>
              <Nav.Link className="ml-auto p-2" href="/" onClick={(e) => logoutHandler(e)}>
                Log Out
              </Nav.Link>
            </Nav>
          )}
        </Navbar>
      </div>
    </div>
  );
}

export default NavbarTop;
