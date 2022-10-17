import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", () => {
  render(<App />);
  // add ice cream scoops and toppings

  // find and click order button

  // check summary information based on order

  // accept terms and conditions and click confirm order button

  // confirm order number on confirmation page

  // click new order button on confirmation page

  // check that scoop and topping subtotals have been reset

  // don't forget async await
});

// create new handler
// post order to server /order

// implementation: call Post via useEffect in OrderConfirmation
// make up format of the data sent to server or send no data
// mock service worker
// screen.debug to have a look at the dom
// import { logRoles } from '@testing-library/dom to check which are
// the available roles at a certain point
// ====> const { container} = render(<APP />);
//       logRoles(container) prints available roles
// if getBySomeStuff() fails
// need to await findBy
// userEvent method without await ?  (eg user.click())
// read ouputError Carefully
