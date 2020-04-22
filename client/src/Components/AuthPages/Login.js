import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./Forms/LoginForm";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../css/Forms.css";
import Alert from "react-bootstrap/Alert";
import { UserContext } from "../../UserContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirectPage, setRedirect] = useState(false);
  const [loginFail, setFail] = useState(false);
  const [show, setShow] = useState(true);
  const {registerSuccess, setRegisterSuccess } = useContext(UserContext);

  localStorage.removeItem("guest");
  localStorage.removeItem("stored-steamgamedata");
  localStorage.removeItem("stored-manualgamedata");

  const onChange = (e) => {
    var targetName = e.target.id;
    switch (targetName) {
      case "name":
        setName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var userData = {
      name: name,
      password: password,
    };

    axios
      .post("/api/users/login", userData)
      .then((res) => {
        // Save to localStorage
        // Set token to localStorage
        const { token, user } = res.data;
        localStorage.setItem("jwtToken", token);
        localStorage.removeItem("guest");
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);

        setRedirect(true);
      })
      .catch((err) => {
        setShow(true);
        setFail(true);
      });
  };

  const successMsg = () => {
    return (
      <div className="alert alert-success" role="alert">
        Sucessfully registered! Please log in.
      </div>
    );
  };


  const failMsg = () => {
    if (registerSuccess) {
      setRegisterSuccess(false);
    }
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>There's an error logging in!</Alert.Heading>
          <p>Please check your username and/or password</p>
        </Alert>
      );
    }
  };

  return (
    <>
      {redirectPage ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="loginPage">
          {registerSuccess ? successMsg() : null}
          {loginFail ? failMsg() : null}
          <LoginForm
            handleSubmit={handleSubmit}
            name={name}
            onChange={onChange}
            password={password}
          />
        </div>
      )}
    </>
  );
}
