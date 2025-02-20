import { positions } from "../constants";
import { getStringPosition } from "../utils";
import { fretYPosition, fretXPosition } from "./constants";
import { onlyBarres } from "./utils";

interface BarreProps {
  frets: [];
  barre: number;
  capo: boolean;
  lite: boolean;
  finger: 0 | 1 | 2 | 3 | 4 | 5;
  theme: ThemeType;
}

export const Barre = ({
  barre,
  frets,
  capo,
  finger,
  lite,
  theme: { primaryColor, textColor, fretPositionColor },
}: BarreProps) => {
  const strings = frets.length;
  const barreFrets = onlyBarres(frets, barre);

  const string1 = barreFrets[0].position;
  const string2 = barreFrets[barreFrets.length - 1].position;
  const width = (string2 - string1) * 10;
  const y = fretYPosition[barre - 1];

  return (
    <g>
      {capo && (
        <g>
          <g
            transform={`translate(${getStringPosition(strings, strings)}, ${
              positions.fret[barreFrets[0].value]
            })`}
          >
            <path
              d={`
            M 0, 0
            m -4, 0
            a 4,4 0 1,1 8,0
          `}
              fill={fretPositionColor}
              fillOpacity={0.2}
              transform="rotate(-90)"
            />
          </g>
          <rect
            fill={fretPositionColor}
            x={fretXPosition[strings][0]}
            y={fretYPosition[barre - 1]}
            width={(strings - 1) * 10}
            fillOpacity={0.2}
            height={8.25}
          />
          <g
            transform={`translate(${getStringPosition(1, strings)}, ${
              positions.fret[barreFrets[0].value]
            })`}
          >
            <path
              d={`
            M 0, 0
            m -4, 0
            a 4,4 0 1,1 8,0
          `}
              fill={fretPositionColor}
              fillOpacity={0.2}
              transform="rotate(90)"
            />
          </g>
        </g>
      )}
      {barreFrets.map((fret) => (
        <circle
          key={fret.position}
          strokeWidth="0.25"
          stroke={primaryColor}
          fill={primaryColor}
          cx={getStringPosition(strings - fret.position, strings)}
          cy={positions.fret[fret.value]}
          r={4}
        />
      ))}
      <rect
        fill={primaryColor}
        x={fretXPosition[strings][string1]}
        y={y}
        width={width}
        height={8.25}
      />
      {!lite &&
        finger &&
        barreFrets.map((fret) => (
          <text
            key={fret.position}
            fontSize="3pt"
            fontFamily="Verdana"
            textAnchor="middle"
            fill={textColor}
            x={getStringPosition(strings - fret.position, strings)}
            y={positions.finger[fret.value]}
          >
            {finger}
          </text>
        ))}
    </g>
  );
};
