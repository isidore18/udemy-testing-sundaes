import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// const Example = () => (
//
// );

export default function SummaryForm() {
  const [tcchecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcchecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        ></Form.Check>
        <h1>SummaryForm</h1>
        <Button variant="primary" type="submit" disabled={!tcchecked}>
          Confirm Order
        </Button>
      </Form.Group>
    </Form>
  );
}
