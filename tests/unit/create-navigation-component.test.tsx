import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";

describe("Navigation component", () => {
  let Nav: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/src/components/Nav");
    Nav = mod.default;
  });

  it("renders nav with data-testid", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it("renders brand name", () => {
    render(<Nav />);
    const brand = screen.getByTestId("nav-brand");
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveTextContent("Paul-Valentin Mini");
  });

  it("renders anchor links for all sections", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-link-profile")).toHaveAttribute("href", "#profile");
    expect(screen.getByTestId("nav-link-skills")).toHaveAttribute("href", "#skills");
    expect(screen.getByTestId("nav-link-experience")).toHaveAttribute("href", "#experience");
    expect(screen.getByTestId("nav-link-education")).toHaveAttribute("href", "#education");
  });

  it("renders hamburger toggle button", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-toggle")).toBeInTheDocument();
  });

  it("toggles mobile menu on hamburger click", async () => {
    render(<Nav />);
    const toggle = screen.getByTestId("nav-toggle");
    const user = userEvent.setup();

    await user.click(toggle);
    expect(screen.getByTestId("nav-menu")).toBeInTheDocument();
  });
});
