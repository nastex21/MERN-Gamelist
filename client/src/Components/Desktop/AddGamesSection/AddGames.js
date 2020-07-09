import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import ManuallyAdded from '../../SearchForGames/ManuallyAdded';

function AddGamesSection({
    manualData
  }) {
    const popoverManual = (
        <Popover id="popover-basic">
          <Popover.Content>
            Search for games and add them to your database right here!
          </Popover.Content>
        </Popover>
      );
    return (
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
    )
  }

  export default AddGamesSection;