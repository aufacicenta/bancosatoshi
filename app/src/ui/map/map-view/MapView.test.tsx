import { screen, render } from "tests";

import { Mapview } from "./Mapview";

describe("Mapview", () => {
  it("renders children correctly", () => {
    render(<Mapview>Mapview</Mapview>);

    const element = screen.getByText("Mapview");

    expect(element).toBeInTheDocument();
  });
});
