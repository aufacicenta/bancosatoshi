import { screen, render } from "tests";

import { Map } from "./Map";

describe("Map", () => {
  it("renders children correctly", () => {
    render(<Map>Map</Map>);

    const element = screen.getByText("Map");

    expect(element).toBeInTheDocument();
  });
});
