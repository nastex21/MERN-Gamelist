import React, { useState } from "react";
import ManuallyAdded from "./Pull-Gamelists/ManualEntries/ManuallyAdded";
import SteamForm from "./Pull-Gamelists/SteamList/SteamForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import GenerateTable from "./GenerateTable/GenerateTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

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
  const [open, setOpen] = useState("0");

  const toggle = () => {
    console.log("toggle");
    console.log(open);
    if (open == 0){
      setOpen("1")
    } else {
      setOpen("0")
    }
  };

  return (
    <div className="buttonBox">
      <div className="mobile-accordion">
        <Accordion defaultActiveKey={open}>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={open}  onClick={toggle} >
              <FontAwesomeIcon icon={open == 0 ? faCaretUp : faCaretDown}/>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className="steamBox">
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
                      <Col md="auto" xs={1}>
                        <div className="vertLine"></div>
                      </Col>
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
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>

      {steamId ? (
        <input
          type="button"
          value="Update Steam Games"
          onClick={updateSteamGames}
        />
      ) : null}

      <div className="dashboard">
        <div className="manualBox">
          <ManuallyAdded uploadData={manualData} />
        </div>
        {games.length === 0 ? null : (
          <p>You have {games.length + games2.length} games</p>
        )}
      </div>
      <hr />
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
