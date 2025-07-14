import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import About from "./About";

describe("About Component", () => {
  test("renders the about heading", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const headingElement = screen.getByText(/Who we are/i);
    expect(headingElement).toBeInTheDocument();
  });
});
