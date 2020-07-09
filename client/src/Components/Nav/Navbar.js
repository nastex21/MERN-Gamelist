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
    /*     <div className="extendNav w-100">
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
            <Nav className="ml-auto">
              <Nav.Link href="/" onClick={(e) => logoutHandler(e)}>
                Log Out
              </Nav.Link>
            </Nav>
          )}
        </Navbar>
      </div>
    </div> */

    <div>
      {props.guestUser && props.location.pathname == "/" ? (
        <div className="sidebar bg-dark" style={{ backgroundColor: "rgb(43,49,56)" }}>
          <a className="active" href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/dashboard">Continue As Guest</a>
        </div>
      ) : props.guestUser && props.location.pathname == "/login" ? (
        <div className="sidebar" style={{ backgroundColor: "rgb(43,49,56)" }}>
        <a href="/">Home</a>
        <a className="active" href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/dashboard">Continue As Guest</a>
      </div>
      ) : props.guestUser && props.location.pathname == "/register" ? (
        <div className="sidebar" style={{ backgroundColor: "rgb(43,49,56)" }}>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a className="active" href="/register">Register</a>
        <a href="/dashboard">Continue As Guest</a>
      </div>) : 
      props.guestUser && props.location.pathname == "/dashboard" ? (
        <div className="sidebar bg-dark">
        <a href="/">Home</a>
        <a href="/dashboard" className="active">Dashboard</a>
        <a href="/dashboard/import">Import</a>
        <a href="/dashboard/search">Search</a>
        <p className="bottomDemo" style={{color: "mediumspringgreen"}}>(In Demo Mode)</p>
      </div> ) : null 
      }
    </div>
  );
}

export default NavbarTop;
