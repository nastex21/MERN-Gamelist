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

export default function LoginForm({ handleSubmit, onChange, password, name}) {
  const [type, setType] = useState("password");
  const [input1Ref, setInput1Focus] = UseFocus();
  const [input2Ref, setInput2Focus] = UseFocus();
  const [completeBtnRef] = UseFocus();

  const showHide = (e) => {
    e.stopPropagation();
    type === "input" ? setType("password") : setType("input");
  };

  useMountEffect(setInput1Focus);
  
  return (
    <div className="formsGroup">
      <form onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            value={name}
            id="name"
            ref={input1Ref}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type={type}
            className="form-control"
            onChange={onChange}
            value={password}
            ref={input2Ref}
            id="password"
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

        <input type="submit" className="btn btn-primary btn-block"  ref={completeBtnRef} />
      </form>
    </div>
  );
}
