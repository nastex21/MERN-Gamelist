import React, { useState, useRef } from "react";
import { Col, Row, OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function MobileSteamForm({ submit, value, onChange }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="container manualSteamLogin text-center input-group input-group-lg">
      <form className="w-100" onSubmit={submit}>
            <input
              className="form-control w-100"
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Enter Steam ID"
            />
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id={`tooltip-right`}>
                  If you know your Steam ID and your profile is public, you can
                  simply import your Steam games by using your Steam ID.
                </Tooltip>
              }
            >
              <Button
                variant="dark"
                className="form-control steamButton"
                type="submit"
              > Import
              </Button>
            </OverlayTrigger>
      </form>
    </div>
  );
}

export default MobileSteamForm;
