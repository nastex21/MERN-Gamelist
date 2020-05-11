import React, { useState, useEffect, useRef } from "react";

const useMountEffect = (fun) => useEffect(fun, []);

// Gneral Focus Hook
const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export default function LoginForm({ handleSubmit, onChange, password, name }) {
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
    <div className="formsGroup loginForm">
      <div className="container-login100">
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form
            className="login100-form flex-sb flex-w"
            onSubmit={handleSubmit}
          >
            <span className="login100-form-title p-b-32">Log In</span>

            <span className="txt1 p-b-11">Username</span>
            <div className="wrap-input100 m-b-36">
              <input
                type="text"
                className="input100"
                onChange={onChange}
                value={name}
                id="name"
                ref={input1Ref}
                name="username"
              />
              <span class="focus-input100"></span>
            </div>

            <span className="txt1 p-b-11">Password</span>
            <div className="wrap-input100 m-b-12">
              <span className="btn-show-pass">
                <i
                  className={
                    type === "password" ? "fa fa-eye" : "fa fa-eye-slash"
                  }
                  onClick={showHide}
                ></i>
              </span>
              <input
                type={type}
                className="input100"
                onChange={onChange}
                value={password}
                ref={input2Ref}
                id="password"
                name="pass"
              />
              <span class="focus-input100"></span>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn" ref={completeBtnRef}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
