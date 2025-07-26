import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router";

jest.mock("./PagesHeader", () => () => <div data-testid="header">Header</div>);
jest.mock("./Footer", () => () => <div data-testid="footer">Footer</div>);

describe("Layout component", () => {
  test("renders Header, children, and Footer", () => {
    const childText = "Test Page Content";

    render(
      <MemoryRouter>
        <Layout>
          <div>{childText}</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
