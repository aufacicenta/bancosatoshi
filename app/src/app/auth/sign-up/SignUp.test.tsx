import { screen, render } from "tests";

import { SignUp } from "./SignUp";

describe("SignUp", () => {
  it("renders children correctly", () => {
    render(<SignUp>SignUp</SignUp>);

    const element = screen.getByText("SignUp");

    expect(element).toBeInTheDocument();
  });
});
