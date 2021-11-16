import { screen, render } from "tests";

import { ListProperty } from "./ListProperty";

describe("ListProperty", () => {
  it("renders children correctly", () => {
    render(<ListProperty>ListProperty</ListProperty>);

    const element = screen.getByText("ListProperty");

    expect(element).toBeInTheDocument();
  });
});
