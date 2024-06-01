import { curry, ifElse, includes, without, append } from "ramda";

export const toggleArrayItem = curry((value, list) => ifElse(
  includes(value),
  without([value]),
  append(value),
)(list));
