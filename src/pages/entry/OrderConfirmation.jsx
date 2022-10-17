import React from "react";
import { Button } from "react-bootstrap";
export default function OrderConfirmation() {
  const [orderNumber, setOrderNumber] = useState(null);
  // if orderNumber === null => display loading
  const passNewOrder = () => {
    // goBackToOrderEntryPhase()
    // cpnt will have useEffects on mounts 
    // setOrderNumber with response
  };

  return (
    <div>
      <h1>Thank you !</h1>
      <h2>Your order number is 123456789</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button variant="primary" onClick={passNewOrder}>
        Create new order
      </Button>
    </div>
  );
}
