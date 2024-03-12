import { store } from "../../store";
import { initialAuthState } from "./authSlice";

describe("Redux auth slice", () => {
  it("should load auth slice data", () => {
    const { auth } = store.getState();

    expect(auth).toEqual(initialAuthState);
  });
});
