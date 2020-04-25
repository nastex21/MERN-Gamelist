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
      <div className="container-login100">
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form
            className="login100-form validate-form flex-sb flex-w"
            noValidate
            onSubmit={handleSubmit}
          >
            <span className="login100-form-title p-b-32">Register</span>
            <span className="txt1 p-b-11">Username</span>
            <div className="wrap-input100 m-b-36">
              <input
                className="input100"
                onChange={onChange}
                value={name}
                id="name"
                type="text"
                ref={input1Ref}
                name="username"
              />
              <span class="focus-input100"></span>
            </div>

            <span className="txt1 p-b-11">Password</span>
            <div className="wrap-input100 m-b-12">
              <input
                type={type}
                className="input100"
                onChange={onChange}
                ref={input2Ref}
                value={password}
                id="password"
                name="pass"
              />
              <span class="focus-input100"></span>
            </div>

            <span className="txt1 p-b-11">Re-Enter Password</span>
            <div className="wrap-input100 m-b-12">
              <input
                type={type}
                className="input100"
                onChange={onChange}
                value={password2}
                ref={input3Ref}
                id="password2"
                name="pass"
              />
              <span class="focus-input100"></span>
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

            {/* <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Submit"
              ref={completeBtnRef}
            /> */}
            <div className="container-login100-form-btn">
              <button className="login100-form-btn" ref={completeBtnRef} type="submit" value="Submit">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
