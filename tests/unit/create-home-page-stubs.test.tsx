import { render, screen } from "@testing-library/react";
import type React from "react";

jest.mock(
  "../../src/components/Section",
  () => ({
    __esModule: true,
    default: ({
      id,
      testId,
      title,
      children,
    }: {
      id: string;
      testId: string;
      title?: string;
      children?: React.ReactNode;
    }) => (
      <section id={id} data-testid={testId}>
        {title && <h2 data-testid={`${testId}-title`}>{title}</h2>}
        {children}
      </section>
    ),
  }),
  { virtual: true },
);

describe("Home page stubs", () => {
  let Page: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/app/page");
    Page = mod.default;
  });

  it("renders main element with data-testid home", () => {
    render(<Page />);
    const main = screen.getByTestId("home");
    expect(main).toBeInTheDocument();
    expect(main.tagName.toLowerCase()).toBe("main");
  });

  const sectionIds = [
    "section-hero",
    "section-profile",
    "section-skills",
    "section-experience",
    "section-education",
  ];

  for (const testId of sectionIds) {
    it(`renders ${testId} section stub`, () => {
      render(<Page />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  }

  it("renders all 5 section stubs as siblings", () => {
    render(<Page />);
    const main = screen.getByTestId("home");
    const sections = main.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
