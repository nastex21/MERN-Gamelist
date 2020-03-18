import React, { useEffect } from "react";

function LogoutPage() {
  useEffect(() => {
    localStorage.removeItem("jwtToken");
  });
  return <div></div>
}

export default LogoutPage;