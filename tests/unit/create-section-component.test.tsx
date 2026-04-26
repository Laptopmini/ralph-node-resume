import { render, screen } from "@testing-library/react";
import type React from "react";

describe("Section component", () => {
  let Section: React.ComponentType<{
    id: string;
    title?: string;
    testId: string;
    children: React.ReactNode;
  }>;

  beforeEach(async () => {
    const mod = await import("@/src/components/Section");
    Section = mod.default;
  });

  it("renders section element with id and data-testid", () => {
    render(
      <Section id="skills" testId="section-skills">
        Content
      </Section>,
    );
    const section = screen.getByTestId("section-skills");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section).toHaveAttribute("id", "skills");
  });

  it("applies section-pad class", () => {
    render(
      <Section id="skills" testId="section-skills">
        Content
      </Section>,
    );
    const section = screen.getByTestId("section-skills");
    expect(section.className).toContain("section-pad");
  });

  it("renders title h2 when title prop is provided", () => {
    render(
      <Section id="skills" title="Skills" testId="section-skills">
        Content
      </Section>,
    );
    const heading = screen.getByTestId("section-skills-title");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading).toHaveTextContent("Skills");
  });

  it("does not render h2 when title is omitted", () => {
    render(
      <Section id="hero" testId="section-hero">
        Content
      </Section>,
    );
    expect(screen.queryByTestId("section-hero-title")).not.toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Section id="test" testId="section-test">
        <div data-testid="child">Hello</div>
      </Section>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });
});
