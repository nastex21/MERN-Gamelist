import React, { useState, useEffect } from "react";
import "../../css/Forms.css";

export default function LoginForm({ handleSubmit, onChange, password, name}) {
  return (
    <div className="formsGroup">
      <form onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <div className="form-group">
          <label>Username or Email address</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter username or email"
            onChange={onChange}
            value={name}
            id="name"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={onChange}
            value={password}
            id="password"
          />
        </div>

        <input type="submit" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
}
