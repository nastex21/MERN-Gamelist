import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Logout() {

  localStorage.removeItem('jwtToken');
  console.log("running Logout")

  return (
    <>
   <Redirect to = "/login" /> 
    </>
)
}