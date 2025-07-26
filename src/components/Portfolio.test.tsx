import { render, screen } from "@testing-library/react";
import Portfolio from "./Portfolio";
import { MemoryRouter } from "react-router";

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>
  );
};

describe("Portfolio component", () => {
  beforeEach(() => {
    renderComponent();
  });

  test("renders portfolio section with title and description", () => {
    expect(screen.getByText("Our Portfolio")).toBeInTheDocument();
    expect(
      screen.getByText(/Explore our recent projects/i)
    ).toBeInTheDocument();
  });

  test("renders all portfolio items", () => {
    const items = [
      "Markers and InfoWindows",
      "Health-adjusted Life Expectancy",
      "Earthquake Magnitude Heatmap",
      "Historical FIFA world cup geo map",
      "Personal injury road accidents in GB from 1979",
      "Uber pick up locations in New York City",
    ];

    items.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByAltText(title)).toBeInTheDocument();
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toBe(6);
  });

  test("images are rendered with correct alt attributes", () => {
    expect(screen.getByAltText("Markers and InfoWindows")).toBeInTheDocument();
    expect(
      screen.getByAltText("Health-adjusted Life Expectancy")
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Earthquake Magnitude Heatmap")
    ).toBeInTheDocument();
  });
});
