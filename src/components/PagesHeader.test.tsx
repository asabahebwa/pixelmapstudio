import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PagesHeader from "./PagesHeader";

const renderComponent = () => {
  //   window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter>
      <PagesHeader />
    </MemoryRouter>
  );
};

describe("PagesHeader component", () => {
  beforeEach(() => {
    renderComponent();
  });

  test("renders logo image and brand name", () => {
    expect(screen.getByAltText("logo-img")).toBeInTheDocument();
    expect(screen.getByText("PixelMap")).toBeInTheDocument();
  });

  test("renders all navigation links", () => {
    expect(screen.getAllByText("Home")[0]).toHaveAttribute("href", "/");
    expect(screen.getAllByText("Services")[0]).toHaveAttribute(
      "href",
      "/services"
    );
    expect(screen.getAllByText("About")[0]).toHaveAttribute("href", "/about");
    expect(screen.getByText("Contact")).toHaveAttribute("href", "/contact");
  });

  test("renders mobile nav links", () => {
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBe(2);

    const servicesLinks = screen.getAllByText("Services");
    expect(servicesLinks.length).toBe(2);

    const aboutLinks = screen.getAllByText("About");
    expect(aboutLinks.length).toBe(2);
  });
});
