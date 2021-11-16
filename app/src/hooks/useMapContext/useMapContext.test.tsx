import { renderHook } from "tests";

import { useMapContext } from "./useMapContext";

describe("useMapContext", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useMapContext());

    expect(result.current).toEqual("1");
  });
});
