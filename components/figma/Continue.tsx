import * as React from "react";
import Svg, {
  SvgProps,
  Circle,
  G,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg";
const Continue = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={68}
    height={68}
    fill="none"
    {...props}
  >
    <Circle cx={34.262} cy={34.402} r={33.5} fill="#53B175" />
    <G clipPath="url(#a)">
      <Path
        fill="#FFF9FF"
        d="M29.666 27.676a1.333 1.333 0 0 1-.352-.947c0-.352.13-.677.379-.934.234-.244.56-.393.9-.393.338 0 .664.122.912.366l7.38 7.66c.117.122.208.27.273.433.065.162.104.338.104.514s-.039.352-.104.528a1.342 1.342 0 0 1-.274.433l-7.38 7.66c-.117.122-.26.23-.416.298-.17.068-.34.108-.509.108-.17 0-.352-.027-.508-.094a1.549 1.549 0 0 1-.43-.298 1.405 1.405 0 0 1-.274-.447 1.192 1.192 0 0 1-.105-.528c0-.175.04-.351.105-.514.065-.162.17-.311.3-.447l6.453-6.699-1.225-1.258-5.229-5.441Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M39.262 43.402h-10v-18h10z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Continue;
