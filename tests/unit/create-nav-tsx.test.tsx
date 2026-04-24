/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import type React from "react";
import "@testing-library/jest-dom";

describe("Nav.tsx", () => {
  let Nav: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("../../src/components/Nav");
    Nav = mod.default;
  });

  it("renders nav with data-testid='nav'", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav")).toBeInTheDocument();
  });

  it("renders brand name with data-testid='nav-brand'", () => {
    const { getByTestId } = render(<Nav />);
    const brand = getByTestId("nav-brand");
    expect(brand).toBeInTheDocument();
    expect(brand.textContent).toContain("Paul-Valentin Mini");
  });

  it("renders anchor links for all sections", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-link-profile")).toBeInTheDocument();
    expect(getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(getByTestId("nav-link-education")).toBeInTheDocument();
  });

  it("anchor links point to correct hash targets", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-link-profile").getAttribute("href")).toBe("#profile");
    expect(getByTestId("nav-link-skills").getAttribute("href")).toBe("#skills");
    expect(getByTestId("nav-link-experience").getAttribute("href")).toBe("#experience");
    expect(getByTestId("nav-link-education").getAttribute("href")).toBe("#education");
  });

  it("renders a hamburger toggle button with data-testid='nav-toggle'", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-toggle")).toBeInTheDocument();
  });

  it("renders a mobile menu with data-testid='nav-menu'", () => {
    const { getByTestId } = render(<Nav />);
    const toggle = getByTestId("nav-toggle");
    fireEvent.click(toggle);
    expect(getByTestId("nav-menu")).toBeInTheDocument();
  });
});
