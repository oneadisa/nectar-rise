import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const BackSvg = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={18}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#181725"
        d="M10.366 15.726c.235.257.365.596.352.948 0 .352-.13.676-.378.934-.235.243-.56.392-.9.392-.339 0-.665-.122-.912-.365l-7.38-7.66a1.343 1.343 0 0 1-.274-.434 1.391 1.391 0 0 1-.104-.514c0-.176.04-.352.104-.528.066-.162.157-.311.274-.433l7.38-7.66c.117-.122.26-.23.417-.298.17-.067.339-.108.508-.108.17 0 .352.027.509.095.156.067.3.176.43.297.117.122.209.285.274.447.078.163.104.338.104.528 0 .176-.04.352-.104.514-.066.163-.17.311-.3.447l-6.454 6.7 1.226 1.258 5.228 5.44Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.77 0h10v18h-10z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BackSvg;
