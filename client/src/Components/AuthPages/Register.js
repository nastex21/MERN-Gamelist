import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from './Forms/RegisterForm';
import "../css/Forms.css";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [redirectPage, setRedirect] = useState(false);

  localStorage.removeItem("guest");
  localStorage.removeItem("stored-gamedata");

  const onChange = e => {
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

  const handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: name,
      password: password,
      password2: password2
    };
    console.log(newUser);
    
    axios
      .post("/api/users/register", newUser)
      .then(res => setRedirect(true)) // re-direct to login on successful register
      .catch(err => setErrors(err));
  };

  
  return (
    <div className="registerPage">
        {redirectPage ? <Redirect to="/login" /> : <RegisterForm handleSubmit={handleSubmit} name={name} onChange={onChange} password={password} password2={password2}/>}
    </div>
  );
}
