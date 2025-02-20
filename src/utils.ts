import { offset, positions } from "./constants";

export const getStringPosition = (string: number, strings: number) =>
  positions.string[string + offset[strings]];
