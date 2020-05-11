import React from "react";
import ManuallyAdded from "./Pull-Gamelists/ManualEntries/ManuallyAdded";
import SteamForm from "./Pull-Gamelists/SteamList/SteamForm";
import GenerateTable from "./GenerateTable/GenerateTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Dashboard({
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
  console.log(successAddMsg);
  return (
    <div className="buttonBox">
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
                    <img className="steamIMG" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
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
