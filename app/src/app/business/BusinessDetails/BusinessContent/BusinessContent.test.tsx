import { screen, render } from "tests";

import { BusinessContent } from "./BusinessContent";

describe("BusinessContent", () => {
  it("renders children correctly", () => {
    render(<BusinessContent>BusinessContent</BusinessContent>);

    const element = screen.getByText("BusinessContent");

    expect(element).toBeInTheDocument();
  });
});
