import React, { useState, useEffect } from "react";
import '../css/Forms.css';

export default function SignUpPage() {
    const handleSubmit = event => {
        event.preventDefault();
        console.log("submit");
    }

    return (
        <div className="formsGroup">
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Username or Email address</label>
                    <input type="email" className="form-control" placeholder="Enter username or email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Re-Enter Password</label>
                    <input type="password" className="form-control" placeholder="Re-Enter password" />
                </div>

                <input type="submit" className="btn btn-primary btn-block" value="Submit" />
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        </div>
    );
}
