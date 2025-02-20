import { Neck } from "./Neck";
import { Dot } from "./Dot";
import { Barre } from "./Barre";
import { ThemeType } from "./types";

type ChordType = {
  frets: number[];
  barres?: number[];
  capo?: boolean;
  fingers?: number[];
  baseFret: number;
};

type InstrumentType = {
  tunings: {
    standard: string[];
  };
  strings: number;
  fretsOnChord: number;
};

interface ChordProps {
  chord: any;
  instrument: InstrumentType;
  lite?: boolean;
  theme?: ThemeType;
}

const Chord = ({
  chord,
  instrument,
  lite = false,
  theme = {
    primaryColor: "#444",
    textColor: "white",
    fretPositionColor: "#555",
  },
}: ChordProps) => {
  const onlyDots = (chord: ChordType) =>
    chord.frets
      .map((f, index) => ({ position: index, value: f }))
      .filter((f) => !chord.barres || chord.barres.indexOf(f.value) === -1);

  return chord ? (
    <svg
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 80 70"
    >
      <g transform="translate(13, 13)">
        <Neck
          tuning={instrument.tunings.standard}
          strings={instrument.strings}
          frets={chord.frets}
          capo={chord.capo}
          fretsOnChord={instrument.fretsOnChord}
          baseFret={chord.baseFret}
          lite={lite}
          theme={theme}
        />

        {chord.barres &&
          chord.barres.map((barre: number, index: number) => (
            <Barre
              key={index}
              capo={index === 0 && chord.capo}
              barre={barre}
              finger={
                chord.fingers && chord.fingers[chord.frets.indexOf(barre)]
              }
              frets={chord.frets}
              lite={lite}
              theme={theme}
            />
          ))}

        {onlyDots(chord).map((fret) => (
          <Dot
            key={fret.position}
            string={instrument.strings - fret.position}
            fret={fret.value}
            strings={instrument.strings}
            finger={chord.fingers && chord.fingers[fret.position]}
            lite={lite}
            theme={theme}
          />
        ))}
      </g>
    </svg>
  ) : null;
};

export default Chord;
