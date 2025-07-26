import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "./Header";

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
};

describe("Header component", () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  test("renders logo and brand name", () => {
    renderComponent();
    const logo = screen.getByAltText("logo-img");
    const brandName = screen.getByText("PixelMap");
    expect(logo).toBeInTheDocument();
    expect(brandName).toBeInTheDocument();
  });

  test("renders all navigation links", () => {
    renderComponent();
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0); // Desktop & mobile
    expect(screen.getAllByText("Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("adds 'scrolled' class on scroll", () => {
    renderComponent();

    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 50 } });
    Object.defineProperty(window, "scrollY", {
      value: 50,
      writable: true,
    });
    fireEvent.scroll(window);

    const header = screen.getByRole("banner");
    expect(header.classList.contains("scrolled")).toBe(true);
  });

  test("does not have 'scrolled' class when scrollY is 0", () => {
    renderComponent();
    const header = screen.getByRole("banner");
    expect(header.classList.contains("scrolled")).toBe(false);
  });
});
