/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import type React from "react";
import "@testing-library/jest-dom";

// Mock next/font/google to avoid actual font loading
jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "mock-inter" }),
}));

// Mock the Nav component
jest.mock("../../src/components/Nav", () => ({
  __esModule: true,
  default: () => <div data-testid="nav">Nav</div>,
}));

describe("layout.tsx", () => {
  let RootLayout: React.ComponentType<{ children: React.ReactNode }>;
  let metadata: { title: string; description: string };

  beforeEach(async () => {
    const mod = await import("../../app/layout");
    RootLayout = mod.default;
    metadata = mod.metadata;
  });

  it("renders html element with lang='en'", () => {
    const { container } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    const html = container.querySelector("html");
    expect(html).not.toBeNull();
    expect(html?.getAttribute("lang")).toBe("en");
  });

  it("renders body with data-testid='app-body'", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    expect(getByTestId("app-body")).toBeInTheDocument();
  });

  it("renders Nav component", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    expect(getByTestId("nav")).toBeInTheDocument();
  });

  it("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>child content</div>
      </RootLayout>,
    );
    expect(getByText("child content")).toBeInTheDocument();
  });

  it("exports metadata with correct title", () => {
    expect(metadata.title).toBe("Paul-Valentin Mini — Senior Software Developer");
  });

  it("exports metadata with a description", () => {
    expect(metadata.description).toBeTruthy();
    expect(metadata.description.length).toBeGreaterThan(10);
  });
});
