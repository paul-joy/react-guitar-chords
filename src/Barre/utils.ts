export const onlyBarres = (frets: [], barre: number) =>
  frets
    .map((f, index) => ({ position: index, value: f }))
    .filter((f) => f.value === barre);
