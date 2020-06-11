import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export default function UpdateSection() {
  const [show, setShow] = useState(true);

  return (
    show ? <Alert variant="dark" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Latest Update:</Alert.Heading>
      <p>
        Looking to add more game services to the "Sources" import section of the site. Stay tuned! 
      </p>
    </Alert> : null
  );
}
