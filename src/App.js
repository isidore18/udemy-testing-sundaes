import React, {useState} from 'react'
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation  from './pages/confirmation/OrderConfirmation'

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress'); // inProgress, review, completed
  let Component = OrderEntry;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry
      break;

    case 'review': 
      Component = OrderSummary
      break;

    case 'completed':
      Component = OrderConfirmation
      break;
      default: 
    }


  return (
    <Container>
      <OrderDetailsProvider >
        {/* summary page and entry page need provider */}
        <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
        {/* <SummaryForm /> */}
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
