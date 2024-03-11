import { store } from "../../store";
import { initialState } from "./authSlice";

describe("Redux auth slice", () => {
  it("should load auth slice data", () => {
    const { auth } = store.getState();

    expect(auth).toEqual(initialState);
  });
});
