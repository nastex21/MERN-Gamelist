import React, { useState, useEffect, useLayoutEffect } from "react";
import ManuallyAdded from "../SearchForGames/ManuallyAdded";
import SteamForm from "../GameServices/Steam/SteamForm";
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
import "../css/Dashboard.css";

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
  const [size, setSize] = useState([0, 0]);
  const [width, height] = useWindowSize();

  function useWindowSize() {
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const popoverImport = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  const popoverManual = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover right</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Content>
    </Popover>
  );

  const mobileLayout = () => {
    return (
      <Breakpoint medium down className="row mainDivSec my-auto">
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
        {/*         <Collapse in={open}>
          <div className="sourcesBox w-100 my-5" id="sources-box">
            <h1 className="w-100">Sources</h1>
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
                className="btn btn-dark form-control w-100"
                type="button"
                value="Update Steam Games"
                onClick={updateSteamGames}
              />
            ) : null}
          </div>
        </Collapse> */}
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
          <div className="dashboard my-5">
            <h1>Game Search</h1>
            <div className="manualBox">
              <ManuallyAdded uploadData={manualData} />
            </div>
          </div>
        </Collapse>
      </Breakpoint>
    );
  };

  const DesktopLayout = () => {
    return (
      <Breakpoint large up className="row sourcesBoxDiv mainDivSec">
        <div className="row statsSection my-5 w-100">
          <Row className="w-100">
            <Col lg={true} className="largeSec">
              <span className="w-100" style={{"display": "flex", "justifyContent": "center"}}>Import Games</span>
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
                                  src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
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
            </Col>
          </Row>
        </div>

        <div className="row searchBox w-100 my-5 largeSec">
          <h1 className="w-100">
            Add Games{" "}
            <FontAwesomeIcon
              style={{ fontSize: "1.5vh", verticalAlign: "super" }}
              icon={faInfoCircle}
            />
          </h1>
          <div className="manualBox w-100">
            <ManuallyAdded uploadData={manualData} />
          </div>
        </div>
      </Breakpoint>
    );
  };

  console.log(size);
  return (
    <div className="container mainDivDash">
      <UpdateSection className="w-100" />
      {width <= 578 ? mobileLayout() : DesktopLayout()}
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
