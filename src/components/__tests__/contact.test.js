import { render, screen } from "@testing-library/react";
import ContactUs from "../ContactUs";
import "@testing-library/jest-dom";

describe("Contact us page test cases", () => {
  test("Should load contact us in component", () => {
    render(<ContactUs />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument(); //Assertion
  });
  test("Should load button in component", () => {
    render(<ContactUs />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
  test("Should load name in  component", () => {
    render(<ContactUs />);

    const inputName = screen.getByPlaceholderText("Name");

    expect(inputName).toBeInTheDocument();
  });
  test("Should load 2 input boxes in  component", () => {
    render(<ContactUs />);

    const inputBoxes = screen.getAllByRole("textbox"); //This is called Querying

    expect(inputBoxes.length).toBe(2);
  });
});
