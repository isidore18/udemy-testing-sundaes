import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// reexports everything
export * from "@testing-library/react";

//override render method
export { renderWithContext as render };
