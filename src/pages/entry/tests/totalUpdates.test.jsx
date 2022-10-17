import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import Options from "../Options";
import OrderSummary from "../../summary/OrderSummary";
import OrderEntry from "../OrderEntry";

test("scoops subtotal updates when change", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });
  const user = userEvent.setup();

  // check total starts at 0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // add one vanilla scoop and check that total is 2.00
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // add two chocolate scoop and check that total is 6.00
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

// screen.getByRole('heading', {name: /grand total: \$/i})
// screen.getByText("Grand total: $", {exact: false}) => less precise than by role

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    await user.click(cherriesCheckbox);
    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("4.00");
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
