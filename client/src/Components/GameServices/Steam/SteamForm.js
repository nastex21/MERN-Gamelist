import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function SteamForm({ submit, value, onChange }) {
  return (
    <div className="container manualSteamLogin text-center input-group input-group-lg">
      <form className="w-100" onSubmit={submit}>
        <p>
          If you know your Steam ID and your profile is public, please use your
          Steam ID otherwise please sign in with your Steam account.
        </p>
        <Row>
          <Col className="input-group col-md-12 col-lg-6 input-group-lg">
            <input
              className="form-control"
              type="text"
              value={value}
              onChange={onChange}
            />
          </Col>
          <Col className="input-group col-md-12 col-lg-6 input-group-lg">
            <input
              className="form-control steamButton"
              type="submit"
              value="Get Steam Games"
            />
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default SteamForm;
