import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface LocationPinProps extends SvgProps {
  width?: number;
  height?: number;
}

const LocationPin = ({
  width = 16,
  height = 19,
  ...props
}: LocationPinProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#4C4F4D"
      fillRule="evenodd"
      d="M11.02 1.308A7.468 7.468 0 0 0 8.123.696a7.397 7.397 0 0 0-5.399 2.22 7.801 7.801 0 0 0-.09 10.87l4.601 4.763a1.009 1.009 0 0 0 1.108.238.948.948 0 0 0 .325-.228l4.683-4.693a7.8 7.8 0 0 0 .101-10.87 7.467 7.467 0 0 0-2.432-1.688Zm-3.058 9.697a2.443 2.443 0 1 0 0-4.885 2.443 2.443 0 0 0 0 4.885Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default LocationPin;
