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
      <Breakpoint medium down>
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
          <div className="steamBox" id="steam-box">
            <h1>Sources</h1>
            <Container fluid="true">
              <Row className="align-items-center">
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
                {steamId ? (
                  <input
                    type="button"
                    value="Update Steam Games"
                    onClick={updateSteamGames}
                  />
                ) : null}
              </Row>
            </Container>
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

      <div className="row">
        <Breakpoint large up className="col-10 dashboardDiv">
          <div className="dashboard">
            <h1>Game Search</h1>
            <div className="manualBox">
              <ManuallyAdded uploadData={manualData} />
            </div>
          </div>
        </Breakpoint>

        <Breakpoint large up className="col-2 steamBoxDiv">
          <div className="steamBox" id="example-collapse-text">
            <h1>Sources</h1>
            <Container fluid="true">
              <Row className="align-items-center">
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
          </div>
          {steamId ? (
            <input
              type="button"
              value="Update Steam Games"
              onClick={updateSteamGames}
            />
          ) : null}
        </Breakpoint>
      </div>

      <StatSection games={games} games2={games2} />
      {games.length === 0 && games2.length === 0 ? null : (
        <GenerateTable
          gamelist={games}
          gameslist2={games2}
          userId={userId}
          deletedGamesRender={deletedGamesRender}
          successAddMsg={successAddMsg}
        />
      )}
    </div>
  );
}

export default Dashboard;
