import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"

/* SVGR has dropped some elements not supported by react-native-svg: filter */

function CurveSVG({height=66,width=434,fill="#fff"}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 434 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{elevation:30}}
    >
      <G filter="url(#filter0_d_27_1743)">
        <Path d="M4.5 1.5c73.833 42 262.2 100.8 425 0H4.5z" fill={fill} />
      </G>
      <Defs></Defs>
    </Svg>
  )
}

export default CurveSVG
