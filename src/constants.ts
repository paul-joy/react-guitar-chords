export const positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4, 6.5, 18, 30, 42, 54],
  finger: [-3, 8, 19.5, 31.5, 43.5],
};

type OffsetType = {
  [key: number]: number;
};

export const offset: OffsetType = {
  4: 0,
  6: -1,
};
