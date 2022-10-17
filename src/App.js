import { Container } from "react-bootstrap";
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from "./context/OrderDetails";
import SummaryForm from "./pages/summary/SummaryForm";

// keep orderPhase in app-level state pass setter to toplevel page cpnts (orderEntry, OrderConfirmation and orderSummary)
// pass resetorderPhase to all cpnts 

function App() {
  const [orderPhase, setOrderPhase] = useState("")
  return (
    <Container>
      <OrderDetailsProvider >
        {/* summary page and entry page need provider */}
        <OrderEntry />
        {/* <SummaryForm /> */}
      </OrderDetailsProvider>
      {/* confirmation page does not need provider */}
    </Container>
  );
}

export default App;
