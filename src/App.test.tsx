import { render, screen } from "@testing-library/react";
import App from "./App";

// jest.mock("./services/earthquakes", () => ({
//   EarthquakesGeojson: {},
//   loadEarthquakeGeojson: jest.fn(),
// }));

// jest.mock("d3", () => ({
//   scaleLinear: jest.fn(() => () => {}),
//   // mock other d3 methods as needed
// }));


test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
