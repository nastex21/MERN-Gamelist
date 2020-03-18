import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./Forms/LoginForm";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import "../css/Forms.css";

export default function LoginPage({ LoginData }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [redirectPage, setRedirect] = useState(false);

  const onChange = e => {
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

  const userData = {
    name: name,
    password: password
  };

  const handleSubmit = event => {
    event.preventDefault();

    var userData = {
      name: name,
      password: password
    }

    axios
      .post("/api/users/login", userData)
      .then(res => {
        console.log(res.data);
        // Save to localStorage
        // Set token to localStorage
        const { token, user } = res.data;
        localStorage.setItem("jwtToken", token);
        localStorage.removeItem('guest');
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        console.log(decoded);
        const userObj = {
          id: decoded.id,
          name: decoded.name
        }
        LoginData(userObj);
      })
      .catch(err =>
        console.log(err)
      );
  };

  return (
    <>
      {redirectPage ? (
        <Redirect to="/dashboard" />
      ) : (
          <LoginForm
            handleSubmit={handleSubmit}
            name={name}
            onChange={onChange}
            password={password}
          />
        )}
    </>
  );
}
