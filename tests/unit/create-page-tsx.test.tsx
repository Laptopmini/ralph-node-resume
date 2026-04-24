/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import type React from "react";
import "@testing-library/jest-dom";

// Mock the Section component to render a simple stub
jest.mock("../../src/components/Section", () => ({
  __esModule: true,
  default: ({
    id,
    testId,
    children,
  }: {
    id: string;
    testId: string;
    children: React.ReactNode;
  }) => (
    <section id={id} data-testid={testId}>
      {children}
    </section>
  ),
}));

describe("page.tsx", () => {
  let Page: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("../../app/page");
    Page = mod.default;
  });

  it("renders a main element with data-testid='home'", () => {
    const { getByTestId } = render(<Page />);
    expect(getByTestId("home")).toBeInTheDocument();
    expect(getByTestId("home").tagName.toLowerCase()).toBe("main");
  });

  it("renders all five section stubs", () => {
    const { getByTestId } = render(<Page />);
    expect(getByTestId("section-hero")).toBeInTheDocument();
    expect(getByTestId("section-profile")).toBeInTheDocument();
    expect(getByTestId("section-skills")).toBeInTheDocument();
    expect(getByTestId("section-experience")).toBeInTheDocument();
    expect(getByTestId("section-education")).toBeInTheDocument();
  });

  it("sections have correct ids for anchor linking", () => {
    const { getByTestId } = render(<Page />);
    expect(getByTestId("section-hero").getAttribute("id")).toBe("hero");
    expect(getByTestId("section-profile").getAttribute("id")).toBe("profile");
    expect(getByTestId("section-skills").getAttribute("id")).toBe("skills");
    expect(getByTestId("section-experience").getAttribute("id")).toBe("experience");
    expect(getByTestId("section-education").getAttribute("id")).toBe("education");
  });
});
