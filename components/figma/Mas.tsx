import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface MasProps extends SvgProps {
  width?: number;
  height?: number;
}

const Mas = ({ width = 18, height = 18, ...props }: MasProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#53B175"
      d="M17.734 9.475c0 .376-.144.74-.414 1.002-.263.27-.626.42-1.002.42h-5.665v5.663c0 .376-.15.739-.42 1.002a1.41 1.41 0 0 1-.996.413 1.424 1.424 0 0 1-1.422-1.415v-5.663H2.15a1.422 1.422 0 0 1-1.003-2.424A1.423 1.423 0 0 1 2.15 8.06h5.665V2.397c0-.376.15-.739.42-1.002a1.403 1.403 0 0 1 1.998 0c.27.263.42.626.42 1.002V8.06h5.665c.376 0 .74.15 1.002.413.27.27.414.626.414 1.002Z"
    />
  </Svg>
);
export default Mas;
