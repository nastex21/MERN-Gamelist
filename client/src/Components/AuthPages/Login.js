import React, { useState, useEffect } from "react";
import '../css/Forms.css';

export default function LoginPage() {
  return (
    <div className="formsGroup">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email or username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
    </div>
  );
}
