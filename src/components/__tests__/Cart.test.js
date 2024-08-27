import { fireEvent, render, screen } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import "@testing-library/jest-dom";
import MOCK_DATA from "../mocks/mockRestaurantMenu.json";
import { act } from "react-test-renderer";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import THeader from "../THeader";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("Should load RestaurantMenu component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <THeader />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );

  const accordianHeader = screen.getByText("Pot Rice(3)");

  fireEvent.click(accordianHeader);

  const foodItems = screen.getAllByTestId("foodItems");

  expect(foodItems.length).toBe(3);

  const addBtns = screen.getAllByRole("button", { name: "ADD" });

  fireEvent.click(addBtns[0]);

  expect(screen.getByText("Cart (1)")).toBeInTheDocument();
});
