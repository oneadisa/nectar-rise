import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

interface AddProps extends SvgProps {
  width?: number;
  height?: number;
}
const Add = ({ width = 47, height = 47, ...props }: AddProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Rect
      width={45.67}
      height={45.668}
      x={0.608}
      y={0.962}
      fill="#53B175"
      rx={17}
    />
    <Path
      fill="#fff"
      d="M31.943 23.796c0 .376-.144.74-.413 1.002-.263.27-.627.42-1.003.42h-5.664v5.662c0 .376-.15.74-.42 1.003-.263.263-.62.413-.997.413a1.423 1.423 0 0 1-1.422-1.416v-5.662H16.36a1.422 1.422 0 0 1-1.003-2.424 1.423 1.423 0 0 1 1.004-.414h5.664v-5.662c0-.376.15-.74.42-1.002a1.403 1.403 0 0 1 1.999 0c.27.263.42.626.42 1.002v5.662h5.664c.376 0 .74.15 1.003.414.27.27.413.626.413 1.002Z"
    />
  </Svg>
);
export default Add;
