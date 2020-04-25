import React, { useState, useEffect, useRef } from "react";
import "../../css/Forms.css";

const useMountEffect = (fun) => useEffect(fun, []);

// Gneral Focus Hook
const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export default function RegisterForm({
  handleSubmit,
  onChange,
  password,
  password2,
  name,
}) {
  const [type, setType] = useState("password");
  const [input1Ref, setInput1Focus] = UseFocus();
  const [input2Ref, setInput2Focus] = UseFocus();
  const [input3Ref, setInput3Focus] = UseFocus();
  const [completeBtnRef] = UseFocus();

  const showHide = (e) => {
    e.stopPropagation();
    type === "input" ? setType("password") : setType("input");
  };

  useMountEffect(setInput1Focus);
  
  return (
    <div className="formsGroup">
      <form noValidate onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            onChange={onChange}
            value={name}
            id="name"
            type="text"
            ref={input1Ref}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type={type}
            className="form-control"
            onChange={onChange}
            ref={input2Ref}
            value={password}
            id="password"
          />
        </div>

        <div className="form-group">
          <label>Re-Enter Password</label>
          <input
            type={type}
            className="form-control"
            onChange={onChange}
            value={password2}
            ref={input3Ref}
            id="password2"
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onClick={showHide}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Show Password
          </label>
        </div>

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Submit"
          ref={completeBtnRef}
        />
        <p className="forgot-password text-right">
          Already registered? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}
