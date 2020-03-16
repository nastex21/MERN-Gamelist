import React, { useState, useEffect } from "react";
import '../css/Forms.css';

export default function SignUpPage() {
  return (
    <form>
    <h3>Sign Up</h3>

    <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Enter email" />
    </div>

    <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" />
    </div>

    <div className="form-group">
        <label>Re-Enter Password</label>
        <input type="password" className="form-control" placeholder="Re-Enter password" />
    </div>

    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
    <p className="forgot-password text-right">
        Already registered <a href="/login">sign in?</a>
    </p>
</form>
  );
}
