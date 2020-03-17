import React, { useState, useEffect } from "react";
import '../css/Forms.css';

export default function Register () {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
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
            case ('password2'):
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

        //need axios.get to send it somewhere. Log In Component as well.
    }

    return (
        <div className="formsGroup">
            <form noValidate onSubmit={handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <span className="red-text">{errors.name}</span>
                    <label>Username or Email address</label>
                    <input className="form-control" onChange={onChange} value={name} error={errors.name} id="name" type="text" placeholder="Enter username or email" />
                </div>

                <div className="form-group">
                    <span className="red-text">{errors.password}</span>
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={password} error={errors.password} id="password" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <span className="red-text">{errors.password2}</span>
                    <label>Re-Enter Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={password2} error={errors.password2} id="password2" placeholder="Re-Enter password" />
                </div>

                <input type="submit" className="btn btn-primary btn-block" value="Submit" />
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        </div>
    );
};