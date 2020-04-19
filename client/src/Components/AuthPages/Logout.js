import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default function Logout() {

 axios.post('/api/users/logout', { } , { withCredentials: true }).then(res => console.log("hi")).catch(err => console.log(err));

  localStorage.removeItem('jwtToken');

  return (
    <>
   <Redirect to = "/login" /> 
    </>
)
}