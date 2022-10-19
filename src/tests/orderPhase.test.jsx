import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);
  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  const button = screen.getByRole("button", { name: "Order Sundae !" });

  // find and click order button
  await user.click(button);

  // accept terms and conditions and click confirm order button
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  await user.click(checkbox);
  const confirmationButton = screen.getByRole("button", {
    name: "Confirm Order",
  });
  await user.click(confirmationButton);
  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = await screen.getByRole("button", {
    name: "Create new order",
  });
  await user.click(newOrderButton);

  // click new order button on confirmation page

  // check that scoop and topping subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00", {
    exact: false,
  });
  const toppingsSubtotal = screen.getByText("Toppings total: $0.00", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");
  // don't forget async await
});
