import React, { useState, useEffect, useLayoutEffect } from "react";
import ManuallyAdded from "../SearchForGames/ManuallyAdded";
import SteamForm from "../GameServices/Steam/SteamForm";
import MobileSteamForm from "../GameServices/Steam/MobileSteamForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Breakpoint } from "react-socks";
import UpdateSection from "../Updates/Updates";
import GenerateTable from "../GenerateTable/GenerateTable";
import {
  Button,
  Container,
  Row,
  Col,
  Collapse,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

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
  const [testOpen, setTestOpen] = useState(true);

  const popoverImport = (
    <Popover id="popover-basic">
      <Popover.Content>
        Import games from your favorite game services!
      </Popover.Content>
    </Popover>
  );

  const popoverManual = (
    <Popover id="popover-basic">
      <Popover.Content>
        Search for games and add them to your database right here!
      </Popover.Content>
    </Popover>
  );

  const mobileLayout = () => {
    return (
      <Breakpoint small down className="row mainDivSec my-auto">
        <Button
          className="align-items-center justify-content-center"
          style={{ width: "100%", "border-radius": "0px" }}
          variant="secondary"
          onClick={() => setOpen(!open)}
          aria-controls="steam-box"
          aria-expanded={open}
        >
          <span className="align-items-center justify-content-center">
            IMPORT GAMES{" "}
            <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
          </span>
          <OverlayTrigger
            trigger="click"
            placement="left"
            overlay={popoverImport}
          >
            <FontAwesomeIcon
              style={{
                fontSize: "1.5vh",
                verticalAlign: "super",
                float: "right",
              }}
              icon={faInfoCircle}
            />
          </OverlayTrigger>
        </Button>
        <Collapse in={open}>
          <div className="dashboard w-100">
            <Container>
              {!steamId ? (
                <Row className="align-items-center input-group input-group-lg my-5">
                  <MobileSteamForm
                    value={value}
                    onChange={handleChange}
                    submit={handleSubmit}
                  />
                  <hr className="w-100" style={{"marginBottom": "20px"}}/>
                  <Col>
                    {!steamId ? (
                      <div className="steamLogIn text-center">
                        <a onClick={handleClick}>
                          <img
                            className="steamIMG"
                            src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                          />
                        </a>
                      </div>
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
        </Collapse>

        <Button
          style={{ width: "100%", "border-radius": "0px" }}
          variant="secondary"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-controls="search-box"
          aria-expanded={searchOpen}
        >
          <span>
            ADD GAMES{" "}
            <FontAwesomeIcon icon={searchOpen ? faCaretUp : faCaretDown} />
          </span>
          <OverlayTrigger
            trigger="click"
            placement="left"
            overlay={popoverManual}
          >
            <FontAwesomeIcon
              style={{
                fontSize: "1.5vh",
                verticalAlign: "super",
                float: "right",
              }}
              icon={faInfoCircle}
            />
          </OverlayTrigger>
        </Button>
        <Collapse in={searchOpen} id="search-box">
          <div className="dashboard">
            <div className="manualBox my-5">
              <ManuallyAdded uploadData={manualData} />
            </div>
          </div>
        </Collapse>
      </Breakpoint>
    );
  };

  const DesktopLayout = () => {
    return (
      <Breakpoint medium up className="row sourcesBoxDiv mainDivSec">
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

        <div className="row searchBox w-100 my-5 largeSec">
          <h1 className="w-100">
            Add Games
            <span> </span>
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={popoverManual}
            >
              <FontAwesomeIcon
                style={{ fontSize: "1.5vh", verticalAlign: "super" }}
                icon={faInfoCircle}
              />
            </OverlayTrigger>
          </h1>
          <Container className="w-100">
            <ManuallyAdded uploadData={manualData} />
          </Container>
        </div>
      </Breakpoint>
    );
  };

  return (
    <div className="container mainDivDash">
      <UpdateSection className="w-100" />
      {mobileLayout()}
      {DesktopLayout()}
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
