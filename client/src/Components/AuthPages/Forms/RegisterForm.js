import React, { useState, useEffect, useRef } from "react";
import "../../css/Forms.css";

const useMountEffect = (fun) => useEffect(fun, []);

// Gneral Focus Hook
const UseFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

  return [htmlElRef, setFocus]
}

const isBoolean = (param) => typeof (param) === "boolean"

export default function RegisterForm({ handleSubmit, onChange, password, password2, name }) {
  const [input1Val, setInput1Val] = useState("")
  const [input1Ref, setInput1Focus] = UseFocus()

  const [input2Val, setInput2Val] = useState("")
  const [input2Ref, setInput2Focus] = UseFocus()

  const [completeBtnRef, setCompleteFocus] = UseFocus()

  useMountEffect(setInput1Focus)
  return (
    <div className="formsGroup">
      <form noValidate onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="form-group">
          <label>Username or Email address</label>
          <input
            className="form-control"
            onChange={(e)=>{
              const val = e.target.value 
              setInput1Val(val)
              if (val.length===1) setInput2Focus()
            }}
            value={input1Val}
            id="name"
            type="text"
            ref={input1Ref}
            placeholder="Enter username or email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e)=>{
              const val = e.target.value
              setInput2Val(val)
              if (val.length===2) setCompleteFocus()
            }}
            ref={input2Ref}
            value={input2Val}
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
          ref={completeBtnRef}
        />
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    </div>
  );
}
