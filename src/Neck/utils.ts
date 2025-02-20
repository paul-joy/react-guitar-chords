import { offsets } from "./constants";

const getNeckHorizontalLine = (pos: number, strings: number): string =>
  `M ${offsets[strings].x} ${12 * pos} H ${offsets[strings].length}`;

const getNeckVerticalLine = (pos: number, strings: number) =>
  `M ${offsets[strings].y + pos * 10} 0 V 48`;

export const getNeckPath = (strings: number, fretsOnChord: number) =>
  Array.from({ length: fretsOnChord + 1 })
    .map((_, pos) => getNeckHorizontalLine(pos, strings))
    .join(" ")
    .concat(
      Array.from({ length: strings })
        .map((_, pos) => getNeckVerticalLine(pos, strings))
        .join(" ")
    );

export const getBarreOffset = (
  strings: number,
  frets: number[],
  baseFret: number,
  capo: boolean | undefined
) =>
  strings === 6
    ? frets[0] === 1 || capo
      ? baseFret > 9
        ? -12
        : -11
      : baseFret > 9
      ? -10
      : -7
    : frets[0] === 1 || capo
    ? baseFret > 9
      ? -1
      : 0
    : baseFret > 9
    ? 3
    : 4;
