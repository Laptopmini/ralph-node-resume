/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import type React from "react";
import "@testing-library/jest-dom";

describe("Section.tsx", () => {
  let Section: React.ComponentType<{
    id: string;
    title?: string;
    testId: string;
    children: React.ReactNode;
  }>;

  beforeEach(async () => {
    const mod = await import("../../src/components/Section");
    Section = mod.default;
  });

  it("renders a section element with correct id and data-testid", () => {
    const { getByTestId } = render(
      <Section id="skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    const section = getByTestId("section-skills");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.getAttribute("id")).toBe("skills");
  });

  it("applies the section-pad class", () => {
    const { getByTestId } = render(
      <Section id="test" testId="section-test">
        <p>content</p>
      </Section>,
    );
    expect(getByTestId("section-test").classList).toContain("section-pad");
  });

  it("renders children", () => {
    const { getByText } = render(
      <Section id="test" testId="section-test">
        <p>Hello world</p>
      </Section>,
    );
    expect(getByText("Hello world")).toBeInTheDocument();
  });

  it("renders an h2 title when title prop is provided", () => {
    const { getByTestId } = render(
      <Section id="skills" testId="section-skills" title="Skills">
        <p>content</p>
      </Section>,
    );
    const heading = getByTestId("section-skills-title");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading.textContent).toBe("Skills");
  });

  it("does not render an h2 when title is not provided", () => {
    const { queryByTestId } = render(
      <Section id="test" testId="section-test">
        <p>content</p>
      </Section>,
    );
    expect(queryByTestId("section-test-title")).toBeNull();
  });
});
