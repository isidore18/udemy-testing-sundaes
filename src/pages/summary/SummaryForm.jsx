import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SummaryForm() {
  const [tcchecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}> Terms and Conditions</span>
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
