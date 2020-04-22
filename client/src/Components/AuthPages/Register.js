import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./Forms/RegisterForm";
import "../css/Forms.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [redirectPage, setRedirect] = useState(false);
  const [registrationFail, setFail] = useState(false);
  const [registrationSuccess, setSuccess] = useState(false);
  const [show, setShow] = useState(true);

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
      case "password2":
        setPassword2(e.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      password: password,
      password2: password2,
    };
    console.log(newUser);

    axios
      .post("/api/users/register", newUser)
      .then((res) => setRedirect(true)) // re-direct to login on successful register
      .catch((err) => setErrors(err), setShow(true), setFail(true));
  };

  const successMsg = () => {
    return (
      <div class="alert alert-success" role="alert">
        Sucessfully registered! Please log in.
      </div>
    );
  };

  const failMsg = () => {
    if (registrationSuccess) {
      setSuccess(false);
    }
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>There's a problem creating your account!</Alert.Heading>
          <p>Username was already taken.</p>
        </Alert>
      );
    }
  };


  return (
    <div className="registerPage">
      {registrationFail ? failMsg() : null}
      {redirectPage ? (
        <Redirect to="/login" />
      ) : (
        <RegisterForm
          handleSubmit={handleSubmit}
          name={name}
          onChange={onChange}
          password={password}
          password2={password2}
        />
      )}
    </div>
  );
}
