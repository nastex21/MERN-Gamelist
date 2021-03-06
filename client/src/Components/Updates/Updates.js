import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export default function UpdateSection() {
  const [show, setShow] = useState(true);

  return (
    show ? <Alert variant="dark" className="pt-4 w-100" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Latest Update:</Alert.Heading>
      <p>
        Looking to add more game services to the "IMPORT GAMES" section of the site. Stay tuned! 
      </p>
    </Alert> : null
  );
}
