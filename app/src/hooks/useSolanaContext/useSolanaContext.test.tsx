import { renderHook } from "tests";

import { useSolanaContext } from "./useSolanaContext";

describe("useSolanaContext", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useSolanaContext());

    expect(result.current).toEqual("1");
  });
});
