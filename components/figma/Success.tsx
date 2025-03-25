import * as React from "react";
import Svg, { SvgProps, Path, Circle, G, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

interface SuccessProps extends SvgProps {
  width?: number;
  height?: number;
}

const SvgComponent = ({
  width = 273,
  height = 241,
  ...props
}: SuccessProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F3603F"
      strokeLinecap="round"
      strokeWidth={3}
      d="M229.132 50.853c7.909.77 24.452-1.779 27.353-18.125 2.9-16.345 10.655-20.87 14.171-21.09"
    />
    <Circle cx={158.897} cy={117.527} r={79.076} fill="#53B175" />
    <G filter="url(#a)">
      <Circle
        cx={158.897}
        cy={117.527}
        r={68.142}
        stroke="#fff"
        strokeOpacity={0.7}
        strokeWidth={2}
      />
    </G>
    <Path
      fill="#fff"
      d="M194.037 100.227c0 2.153-.845 4.232-2.381 5.717l-35.716 34.599c-1.613 1.485-3.764 2.376-5.992 2.376a8.585 8.585 0 0 1-5.914-2.376l-17.897-17.299c-1.536-1.485-2.381-3.564-2.381-5.717 0-2.153.922-4.158 2.458-5.717 1.613-1.485 3.687-2.302 5.914-2.376 2.228 0 4.302.817 5.915 2.302l11.905 11.508 29.803-28.808a8.657 8.657 0 0 1 5.914-2.302c2.228.075 4.301.891 5.914 2.45 1.537 1.486 2.458 3.49 2.458 5.643Z"
    />
    <Path
      stroke="#F7B23B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M218.104 196.603c7.382 2.133 21.654 10.236 19.685 25.59"
    />
    <Path
      stroke="#6E89FA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M1.578 174.935c11.328 4.267 35.75 7.327 42.812-14.565m0 0c1.03-6.032 0-17.963-12.358-17.434-2.354 5.812-3.178 17.434 12.358 17.434Zm0 0c5.15.956 17.125.044 23.834-11.255"
    />
    <Circle cx={181.348} cy={233.423} r={7.58} fill="#637BFE" />
    <Circle cx={253.002} cy={113.396} r={7.08} stroke="#C05EFD" />
    <Circle cx={132.684} cy={8.996} r={8.3} fill="#53B175" />
    <Circle cx={156.25} cy={23.006} r={4.383} fill="#F3603F" />
    <Circle cx={59.636} cy={87.381} r={7.182} stroke="#F7B23B" />
    <Circle cx={77.281} cy={208.512} r={7.947} stroke="#53B175" />
    <Circle
      cx={4.035}
      cy={4.035}
      r={4.035}
      fill="#53B175"
      transform="matrix(-1 0 0 1 161.816 220.695)"
    />
    <Defs></Defs>
  </Svg>
);
export default SvgComponent;
