import { screen, render } from "tests";

import { ModalNavbar } from "./ModalNavbar";

describe("ModalNavbar", () => {
  it("renders children correctly", () => {
    render(<ModalNavbar>ModalNavbar</ModalNavbar>);

    const element = screen.getByText("ModalNavbar");

    expect(element).toBeInTheDocument();
  });
});
