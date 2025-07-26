import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../components/Contact";

// Mock fetch globally
global.fetch = jest.fn();

const mockSuccessResponse = {
  success: true,
};

const mockFailureResponse = {
  success: false,
};

describe("Contact component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields and submit button", () => {
    render(<Contact />);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  test("updates input values", () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Hello!" },
    });

    expect(screen.getByLabelText(/first name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      "john@example.com"
    );
    expect(screen.getByLabelText(/message/i)).toHaveValue("Hello!");
  });

  test("shows success message on successful submission", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Hello!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/thank you! your message has been sent/i)
      ).toBeInTheDocument();
    });
  });

  test("shows error message on failed submission", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockFailureResponse),
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Hello!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/there was a problem sending your message/i)
      ).toBeInTheDocument();
    });
  });

  test("shows loading spinner while submitting", async () => {
    const mockPromise = new Promise((resolve) =>
      setTimeout(() => resolve({ json: () => mockSuccessResponse }), 500)
    );

    (fetch as jest.Mock).mockReturnValueOnce(mockPromise as any);

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Hello!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you!/i)).toBeInTheDocument();
    });
  });
});
