import { store } from "../../store";
import { initialState } from "./accountsSlice";

describe("Redux accounts slice", () => {
  it("should load accounts slice data", () => {
    const { accounts } = store.getState();

    expect(accounts).toEqual(initialState);
  });
});
