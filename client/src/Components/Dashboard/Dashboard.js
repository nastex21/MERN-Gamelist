import React, { useState, useEffect } from "react";
import ManuallyAdded from "../SearchForGames/ManuallyAdded";
import SteamForm from "../GameServices/Steam/SteamForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Breakpoint } from "react-socks";
import UpdateSection from "../Updates/Updates";
import StatSection from "../StatsSection/Stats";
import Button from "react-bootstrap/Button";
import GenerateTable from "../GenerateTable/GenerateTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";

function Dashboard({
  manualData,
  steamId,
  userId,
  value,
  handleChange,
  handleSubmit,
  handleClick,
  games,
  games2,
  updateSteamGames,
  deletedGamesRender,
  successAddMsg,
}) {
  const [open, setOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "auto";
  });

  console.log("open: " + open);
  return (
    <div className="container mainDivDash">
      <UpdateSection />

      <Breakpoint medium down className="row">
        <Button
          className="align-items-center justify-content-center"
          style={{ width: "100%", "border-radius": "0px" }}
          variant="secondary"
          onClick={() => setOpen(!open)}
          aria-controls="steam-box"
          aria-expanded={open}
        >
          <span className="align-items-center justify-content-center">
            Add Source <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
          </span>
        </Button>
        <Collapse in={open}>
          <div className="sourcesBox" id="sources-box">
            <h1>Sources</h1>
            <Container>
              <Row className="input-group input-group-lg w-100 h-100">
                {!steamId ? (
                  <Col xs={5}>
                    <SteamForm
                      value={value}
                      onChange={handleChange}
                      submit={handleSubmit}
                    />
                  </Col>
                ) : null}
                {!steamId ? (
                  <Col xs={5}>
                    <div className="steamLogIn text-center">
                      <a onClick={handleClick}>
                        <img
                          className="steamIMG"
                          src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                        />
                      </a>
                    </div>
                  </Col>
                ) : null}
              </Row>
            </Container>
            {steamId ? (
              <input
                className="form-control w-100"
                type="button"
                value="Update Steam Games"
                onClick={updateSteamGames}
              />
            ) : null}
          </div>
        </Collapse>
        <Button
          style={{ width: "100%", "border-radius": "0px" }}
          variant="secondary"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-controls="search-box"
          aria-expanded={searchOpen}
        >
          <span>
            Add Games{" "}
            <FontAwesomeIcon icon={searchOpen ? faCaretUp : faCaretDown} />
          </span>
        </Button>
        <Collapse in={searchOpen} id="search-box">
          <div className="dashboard">
            <h1>Game Search</h1>
            <div className="manualBox">
              <ManuallyAdded uploadData={manualData} />
            </div>
          </div>
        </Collapse>
      </Breakpoint>

      <Breakpoint large up className="row sourcesBoxDiv w-100">
        <div className="sourcesBox" id="example-collapse-text">
          <h1>Sources</h1>
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
              </Row>
            ) : null}
            <hr />
            {!steamId ? (
              <Row>
                <Col>
                  <div className="steamLogIn text-center">
                    <a onClick={handleClick}>
                      <img
                        className="steamIMG"
                        src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                      />
                    </a>
                  </div>
                </Col>
              </Row>
            ) : null}
          </Container>
        </div>
        {steamId ? (
          <input
            className="form-control w-100"
            type="button"
            value="Update Steam Games"
            onClick={updateSteamGames}
          />
        ) : null}
        <div className="dashboard">
          <h1>Game Search</h1>
          <div className="manualBox">
            <ManuallyAdded uploadData={manualData} />
          </div>
        </div>
      </Breakpoint>

      <div className="row statsSection">
        <StatSection games={games} games2={games2} />
      </div>
      {games.length === 0 && games2.length === 0 ? null : (
        <div className="row">
          <GenerateTable
            gamelist={games}
            gameslist2={games2}
            userId={userId}
            deletedGamesRender={deletedGamesRender}
            successAddMsg={successAddMsg}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
