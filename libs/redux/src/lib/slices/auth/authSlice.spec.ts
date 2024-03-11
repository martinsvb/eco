import { store } from "../../store";
import { increaseSuit, increaseValue, initialState } from "./authSlice";

describe("Redux matches slice", () => {
  it("should load matches slice data", () => {
    const { matches } = store.getState();

    expect(matches).toEqual(initialState);
  });

  it("should increase value", () => {
    store.dispatch(increaseValue());

    expect(store.getState().matches).toEqual({
      value: 1,
      suit: 0,
    });
  });

  it("should increase suit", () => {
    store.dispatch(increaseSuit());

    expect(store.getState().matches).toEqual({
      value: 1,
      suit: 1,
    });
  });
});
