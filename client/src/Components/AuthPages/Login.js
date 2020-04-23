import React, { useState, useContext } from "react";
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
  const [errorMsg, setErrorMsg] = useState("");

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

    if (name.length == 0){
      setErrorMsg("Please don't leave username blank");
      setShow(true);
    } else if (password.length < 6) {
      setErrorMsg("Password must be at least six characters long.");
      setShow(true);
    } else { 
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
        setErrorMsg('');
        setShow(true);
        setFail(true);
      });
  };
}

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

  const errorMsgAlert = () => {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p>{errorMsg}</p>
        </Alert>
      );
    }
  }

  return (
    <>
      {redirectPage ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="loginPage">
          {errorMsg ? errorMsgAlert() : null}
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
