import { render, screen } from "@testing-library/react";
import Services from "./Services";
import { MemoryRouter } from "react-router";

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>
  );
};

describe("Services Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  test("renders services container", () => {
    expect(screen.getByTestId("services-container")).toBeInTheDocument();
  });

  test("renders hero title", () => {
    expect(
      screen.getByText(/We help you explore, understand, and communicate/i)
    ).toBeInTheDocument();
  });

  test("renders 'Let's talk' button (top and bottom)", () => {
    const buttons = screen.getAllByText("Let's talk");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("href", "/contact");
    });
  });

  test("renders approach section with headings", () => {
    expect(screen.getByText("Our Approach")).toBeInTheDocument();
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("Pre-production")).toBeInTheDocument();
    expect(screen.getByText("Production")).toBeInTheDocument();
  });

  test("renders section title for services list", () => {
    expect(screen.getByText("Services to grow your brand")).toBeInTheDocument();
  });

  test("renders all 6 service items with correct content", () => {
    const serviceTitles = [
      "Mapping",
      "3D Modeling",
      "Dashboards",
      "Interactivity",
      "Scalability",
      "Customization",
    ];

    serviceTitles.forEach((title) => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();

      const demoText = screen.getByText(
        new RegExp(`See ${title.toLowerCase()} demos`, "i")
      );
      expect(demoText).toBeInTheDocument();
    });

    const images = screen.getAllByAltText("customization");
    expect(images.length).toBe(6);
  });
});
