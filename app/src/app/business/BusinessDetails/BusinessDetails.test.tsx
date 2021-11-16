import { screen, render } from "tests";

import { BusinessDetails } from "./BusinessDetails";

describe("BusinessDetails", () => {
  it("renders children correctly", () => {
    render(<BusinessDetails>BusinessDetails</BusinessDetails>);

    const element = screen.getByText("BusinessDetails");

    expect(element).toBeInTheDocument();
  });
});
