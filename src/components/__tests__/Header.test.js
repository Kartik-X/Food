import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import THeader from "../THeader";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should load Header component with login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <THeader />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });
  //   const loginButton = screen.getByText("Login");
  expect(loginButton).toBeInTheDocument();
});
it("Should load Header component with cart items 0", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <THeader />
      </Provider>
    </BrowserRouter>
  );

  const cartItem = screen.getByText("Cart (0)");
  expect(cartItem).toBeInTheDocument();
});
it("Should load Header component with a cart item", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <THeader />
      </Provider>
    </BrowserRouter>
  );

  const cartItem = screen.getByText(/Cart/); //Regix
  expect(cartItem).toBeInTheDocument();
});
it("Should change to login button to logout on click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <THeader />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });

  fireEvent.click(loginButton);

  const logoutButton = screen.getByRole("button", { name: "Logout" });

  expect(logoutButton).toBeInTheDocument();
});
