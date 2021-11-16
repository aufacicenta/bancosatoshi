import { screen, render } from "tests";

import { MapMarker } from "./MapMarker";

describe("MapMarker", () => {
  it("renders children correctly", () => {
    render(<MapMarker>MapMarker</MapMarker>);

    const element = screen.getByText("MapMarker");

    expect(element).toBeInTheDocument();
  });
});
