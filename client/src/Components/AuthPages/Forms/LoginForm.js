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
    <div className="formsGroup">
      <div className="container-login100">
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form
            className="login100-form validate-form flex-sb flex-w"
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
              <span className="focus-input100"></span>
            </div>

            <span className="txt1 p-b-11">Password</span>
            <div className="wrap-input100 m-b-12">
              <span class="btn-show-pass">
                <i class="fa fa-eye"></i>
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
              <span className="focus-input100"></span>
            </div>

            <div className="flex-sb-m w-full p-b-48">
              {/* <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onClick={showHide}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Show Password
              </label>
               */}
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                />
                <label className="label-checkbox100" for="ckb1">
                  Remember me
                </label>
              </div>
            </div>

            {/* <input
              type="submit"
              className="btn btn-primary btn-block"
              ref={completeBtnRef}
            /> */}
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
