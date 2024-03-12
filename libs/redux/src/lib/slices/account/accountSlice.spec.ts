import { store } from "../../store";
import { initialAccountState } from "./accountSlice";

describe("Redux account slice", () => {
  it("should load account slice data", () => {
    const { account } = store.getState();

    expect(account).toEqual(initialAccountState);
  });
});
