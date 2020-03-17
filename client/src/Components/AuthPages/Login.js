import React, { useState, useEffect } from "react";
import '../css/Forms.css';
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";

const LoginPage = props => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onChange = e => {
    var targetName = e.target.id;
    switch (targetName) {
      case ('name'):
        setName(e.target.value);
        break;
      case ('password'):
        setPassword(e.target.value);
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log(name);
    console.log(password);
  }, [name, password])

  const userData = {
    name: name,
    password: password
  };

  const handleSubmit = event => {
    event.preventDefault();

  }

  return (
    <div className="formsGroup">
      <form onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <div className="form-group">
          <label>Username or Email address</label>
          <input type="name" className="form-control" placeholder="Enter username or email" onChange={onChange} value={name} error={errors.name} id="name"  />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={onChange} value={password} error={errors.password} id="password" />
        </div>

        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
}

export default LoginPage;