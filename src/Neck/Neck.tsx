import { ThemeType } from "../types";
import { offsets } from "./constants";
import { getBarreOffset, getNeckPath } from "./utils";

interface NeckProps {
  tuning: string[];
  frets: number[];
  capo?: boolean;
  strings: number;
  baseFret?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  fretsOnChord: number;
  lite?: boolean;
  theme: ThemeType;
}

export const Neck = ({
  tuning,
  frets,
  strings,
  fretsOnChord,
  baseFret = 1,
  capo,
  lite = false,
  theme: { primaryColor },
}: NeckProps) => {
  return (
    <g>
      <path
        stroke={primaryColor}
        strokeWidth="0.25"
        strokeLinecap="square"
        strokeLinejoin="round"
        d={getNeckPath(strings, fretsOnChord)}
      />
      {baseFret === 1 ? (
        <path
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={`M ${offsets[strings].x} 0 H ${offsets[strings].length}`}
        />
      ) : (
        <text
          fontSize="0.25rem"
          fill={primaryColor}
          fontFamily="Verdana"
          x={getBarreOffset(strings, frets, baseFret, capo)}
          y="8"
        >
          {baseFret}fr
        </text>
      )}
      {!lite && (
        <g>
          {tuning.slice().map((note, index) => (
            <text
              key={index}
              fontSize="0.3rem"
              fill={primaryColor}
              fontFamily="Verdana"
              textAnchor="middle"
              x={offsets[strings].x + index * 10}
              y="53"
            >
              {note}
            </text>
          ))}
        </g>
      )}
    </g>
  );
};
