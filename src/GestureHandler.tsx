// import React from 'react';
// import { View } from 'react-native';
// import Animated from "react-native-reanimated";
// import { usePanGesturesHandler} from "react-native-redash";

// import {ITEM_HEIGHT} from "./Constants";

// interface GestureHandlerProps {
//   translateY: Animated.Value<number>;
//   max: number;
// }

// const GestureHandler = ({ translateY, max }): GestureHandlerProps) => {
//   const {
//     gestureHandler,
//     translation,
//     velocity,
//     state,
  
//   } = usePanGestureHandler();
  
//   const snapPoints = new Array(max).fill(0).map((_,i) => -i * ITEM_HEIGHT);

//   useCode(() => set(translateY, withSnapToInterval(
//     value: translation.y,
//     velocity: velocity.y,
//     state,
//     snapPoints})), []);
//   return (
//     <PanGestureHandler {...gestureHandler}>
//      <Animated.View style={StyleSheet.absoluteFill} />
//     </PanGestureHandler>
//   );
// };

// export default GestureHandler;