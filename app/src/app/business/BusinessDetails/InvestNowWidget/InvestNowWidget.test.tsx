import { screen, render } from "tests";

import { InvestNowWidget } from "./InvestNowWidget";

describe("InvestNowWidget", () => {
  it("renders children correctly", () => {
    render(<InvestNowWidget>InvestNowWidget</InvestNowWidget>);

    const element = screen.getByText("InvestNowWidget");

    expect(element).toBeInTheDocument();
  });
});
