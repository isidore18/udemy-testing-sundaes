import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm Order" });
  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("button is unchecked checkbox enables button then disables it", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const button = screen.getByRole("button", { name: "Confirm Order" });
  await user.click(checkbox);
  expect(button).toBeEnabled();
  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // set up userEvent
  const user = userEvent.setup();

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  const overlay = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(overlay).not.toBeInTheDocument();
});
