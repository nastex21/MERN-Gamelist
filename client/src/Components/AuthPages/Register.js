import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../../UserContext';
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
  const {registerSuccess, setRegisterSuccess } = useContext(UserContext);
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

  const updateSuccessMsg = () => {
    console.log('success');
    setRedirect(true);
    setRegisterSuccess(true);
  }

  const updateFailMsg = (err) => {
    console.log('failed');
    setErrors(err); 
    setShow(true); 
    setFail(true);
  }

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
      .then((res) => updateSuccessMsg())
      .catch(err => err ? updateFailMsg(err) : null)
  }
;

 
  const failMsg = () => {
    if (registerSuccess) {
      setRegisterSuccess(false);
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
