import { render } from "@testing-library/react";
import type React from "react";

jest.mock(
  "next/font/google",
  () => ({
    Inter: () => ({ className: "inter-mock" }),
  }),
  { virtual: true },
);

jest.mock(
  "../../src/components/Nav",
  () => ({
    __esModule: true,
    default: () => <div data-testid="nav">Nav Mock</div>,
  }),
  { virtual: true },
);

describe("Root layout", () => {
  let RootLayout: React.ComponentType<{ children: React.ReactNode }>;
  let metadata: { title: string; description: string };

  beforeEach(async () => {
    const mod = await import("@/app/layout");
    RootLayout = mod.default;
    metadata = mod.metadata;
  });

  it("renders html element with lang=en", () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });

  it("renders body with data-testid app-body", () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(document.body.getAttribute("data-testid")).toBe("app-body");
  });

  it("renders Nav component", () => {
    const { getByTestId } = render(<RootLayout>Test Content</RootLayout>);
    expect(getByTestId("nav")).toBeInTheDocument();
  });

  it("renders children", () => {
    const { getByText } = render(<RootLayout>Hello World</RootLayout>);
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("exports metadata with correct title", () => {
    expect(metadata.title).toBe("Paul-Valentin Mini — Senior Software Developer");
  });

  it("exports metadata with description", () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description.length).toBeGreaterThan(0);
  });
});
