import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders the footer container", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
  });

  test("renders brand name and slogan", () => {
    render(<Footer />);
    expect(screen.getByText("PixelMap")).toBeInTheDocument();
    expect(
      screen.getByText("precise data-viz craftsmanship")
    ).toBeInTheDocument();
  });

  test("renders all social media icons with correct aria-labels and hrefs", () => {
    render(<Footer />);
    const links = [
      { label: "xTwitter", href: "https://x.com" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Threads", href: "https://bluesky.com" },
    ];

    links.forEach(({ label, href }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  test("renders Products & Services section with all options", () => {
    render(<Footer />);
    expect(screen.getByText("Products & Services")).toBeInTheDocument();
    expect(screen.getByText("For Business")).toBeInTheDocument();
    expect(screen.getByText("For Partners")).toBeInTheDocument();
    expect(screen.getByText("For Advertising")).toBeInTheDocument();
    expect(screen.getByText("For Developers")).toBeInTheDocument();
  });

  test("renders Contact section with email and phone", () => {
    render(<Footer />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("lasabahebwa@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("(+256) 785 759096")).toBeInTheDocument();
  });

  test("renders footer bottom trademark and links", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 PixelMap, Inc\./i)).toBeInTheDocument();
    expect(screen.getByText("Terms of Use")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
  });
});
