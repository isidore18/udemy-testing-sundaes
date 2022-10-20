import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  // if orderNumber === null => display loading
  const passNewOrder = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order}`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <h1>Thank you !</h1>
      <h2>Your order number is {orderNumber ? orderNumber : "loading"}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button variant="primary" onClick={passNewOrder}>
        Create new order
      </Button>
    </div>
  );
}
