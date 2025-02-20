import { positions } from "../constants";
import { ThemeType } from "../types";
import { getStringPosition } from "../utils";
import { radius } from "./constants";

type DotProps = {
  string: number;
  fret: number;
  finger: 0 | 1 | 2 | 3 | 4 | 5;
  strings: number;
  lite: boolean;
  theme: ThemeType;
};

export const Dot = ({
  string,
  fret = 0,
  finger,
  strings,
  lite = false,
  theme: { primaryColor, textColor },
}: DotProps) =>
  fret === -1 ? (
    <text
      fontSize="0.7rem"
      fill={primaryColor}
      fontFamily="Verdana"
      textAnchor="middle"
      x={getStringPosition(string, strings)}
      y="-2"
    >
      x
    </text>
  ) : (
    <g>
      <circle
        strokeWidth="0.25"
        stroke={primaryColor}
        fill={fret === 0 ? "transparent" : primaryColor}
        cx={getStringPosition(string, strings)}
        cy={positions.fret[fret]}
        r={fret === 0 ? radius["open"] : radius["fret"]}
      />
      {!lite && finger > 0 && (
        <text
          fontSize="3pt"
          fontFamily="Verdana"
          textAnchor="middle"
          fill={textColor}
          x={getStringPosition(string, strings)}
          y={positions.finger[fret]}
        >
          {finger}
        </text>
      )}
    </g>
  );
