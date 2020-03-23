import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default function Logout() {

  axios
  .get("/api/users/logout")
  .then(res => console.log("hi")) // re-direct to login on successful register
  .catch(err => console.log(err));

  localStorage.removeItem('jwtToken');
  console.log("running Logout");

  return (
    <>
   <Redirect to = "/login" /> 
    </>
)
}