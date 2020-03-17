import React, { useState, useEffect } from "react";
import "../../css/Forms.css";

export default function RegisterForm({ handleSubmit, onChange, password, password2, name  }) {
  return (
    <div className="formsGroup">
      <form noValidate onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="form-group">
          <label>Username or Email address</label>
          <input
            className="form-control"
            onChange={onChange}
            value={name}
            id="name"
            type="text"
            placeholder="Enter username or email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={password}
            id="password"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label>Re-Enter Password</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            value={password2}
            id="password2"
            placeholder="Re-Enter password"
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Submit"
        />
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    </div>
  );
}
