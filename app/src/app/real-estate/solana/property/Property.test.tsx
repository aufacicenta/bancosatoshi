import { screen, render } from "tests";

import { Property } from "./Property";

describe("Property", () => {
  it("renders children correctly", () => {
    render(<Property>Property</Property>);

    const element = screen.getByText("Property");

    expect(element).toBeInTheDocument();
  });
});
