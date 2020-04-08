import React from "react";
import "./css/FrontPage.css";
import ImageCredit from "./ImageCredit";
import { Container } from 'react-bootstrap';
import Jumbotron from "react-bootstrap/Jumbotron";

export default function FrontPage() {
  return (
    <div className="frontPage">
      <Jumbotron fluid>
        <Container>
          <h1>Catalog your video game collection</h1>
          <p>
             Everything from yesterday to today.
          </p>
        </Container>
      </Jumbotron>
      <ImageCredit />
    </div>
  );
}
