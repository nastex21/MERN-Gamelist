import React from "react";
import HomePage from "./Components/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <>
        <Route exact path="/" component={HomePage} />
      </>
    </Router>
  );
};