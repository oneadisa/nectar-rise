import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface ShareProps extends SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}
const Share = ({
  width = 20,
  height = 20,
  fill = "#181725",
  ...props
}: ShareProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill={fill}
      stroke="#fff"
      strokeWidth={0.3}
      d="m11.552 5.267-.256-.256v7.801a1.169 1.169 0 0 1-2.337 0V5.01l-.256.256-1.478 1.48a1.17 1.17 0 0 1-1.653-1.655l3.73-3.728a1.164 1.164 0 0 1 1.651 0l3.73 3.729a1.169 1.169 0 1 1-1.654 1.654l-1.477-1.48ZM3.535 11.27h-.15V16.844H16.87V11.27H15.4a1.168 1.168 0 1 1 0-2.337h1.319a2.487 2.487 0 0 1 2.487 2.487v5.274a2.487 2.487 0 0 1-2.487 2.486H3.535a2.487 2.487 0 0 1-2.487-2.486V11.42a2.487 2.487 0 0 1 2.487-2.487h1.319a1.168 1.168 0 0 1 0 2.337H3.535Z"
    />
  </Svg>
);
export default Share;
