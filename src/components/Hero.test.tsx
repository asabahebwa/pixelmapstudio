import { screen, render } from "@testing-library/react";
import Hero from "./Hero";

jest.mock("../components/Type", () => () => (
  <div data-testid="type-component">Mocked Type</div>
));

describe("Hero component", () => {
  test("renders without crashing", () => {
    render(<Hero />);
    const heroWrapper = screen.getByTestId("hero-wrapper");
    expect(heroWrapper).toBeInTheDocument();
  });

  test("displays the static text 'Data can be'", () => {
    render(<Hero />);
    expect(screen.getByText("Data can be")).toBeInTheDocument();
  });

  test("renders the Type component", () => {
    render(<Hero />);
    expect(screen.getByTestId("type-component")).toBeInTheDocument();
  });

  test("has the hero-content and hero-bottom-image divs", () => {
    render(<Hero />);
    expect(
      screen.getByText("Data can be").closest(".hero-content")
    ).toBeInTheDocument();
    expect(document.querySelector(".hero-bottom-image")).toBeInTheDocument();
  });
});
