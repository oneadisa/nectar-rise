import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface MenosProps extends SvgProps {
  width?: number;
  height?: number;
}

const Menos = ({ width = 18, height = 3, ...props }: MenosProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#B3B3B3"
      d="M17.064 1.472c0 .376-.144.74-.413 1.002-.264.27-.627.42-1.003.42H1.48A1.422 1.422 0 0 1 .477.47 1.423 1.423 0 0 1 1.48.057h14.168c.376 0 .74.15 1.003.413.269.27.413.626.413 1.002Z"
    />
  </Svg>
);
export default Menos;
