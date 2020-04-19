import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./Forms/LoginForm";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import "../css/Forms.css";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirectPage, setRedirect] = useState(false);

  localStorage.removeItem("guest");
  localStorage.removeItem("stored-steamgamedata");
  localStorage.removeItem("stored-manualgamedata");

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

  const handleSubmit = event => {
    event.preventDefault();

    var userData = {
      name: name,
      password: password
    }

    axios
      .post("/api/users/login", userData)
      .then(res => {
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
        const userObj = {
          id: decoded.id,
          name: decoded.name,
          games: decoded.games
        }
        setRedirect(true);
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
        <div className="loginPage">
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
