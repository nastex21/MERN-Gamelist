import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import SteamForm from "../../GameServices/Steam/SteamForm";

function ImportSection({
  steamId,
  value,
  handleChange,
  handleSubmit,
  handleClick,
  updateSteamGames,
}) {
  const popoverImport = (
    <Popover id="popover-basic">
      <Popover.Content>
        Import games from your favorite game services!
      </Popover.Content>
    </Popover>
  );
  return (
    <div className="row statsSection my-5 w-100">
      <h1 className="w-100">
        Import Games
        <span> </span>
        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={popoverImport}
        >
          <FontAwesomeIcon
            style={{ fontSize: "1.5vh", verticalAlign: "super" }}
            icon={faInfoCircle}
          />
        </OverlayTrigger>
      </h1>
      <Container>
        {!steamId ? (
          <Row className="align-items-center input-group input-group-lg">
            <Col>
              <SteamForm
                value={value}
                onChange={handleChange}
                submit={handleSubmit}
              />
            </Col>
            <Col>
              {!steamId ? (
                <Row>
                  <Col>
                    <div className="steamLogIn text-center">
                      <a onClick={handleClick}>
                        <img
                          className="steamIMG"
                          src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png"
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
              ) : (
                <input
                  className="btn btn-dark form-control w-100"
                  type="button"
                  value="Update Steam Games"
                  onClick={updateSteamGames}
                />
              )}
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default ImportSection;
