import { Loader2 } from "lucide-react";
import { animated, easings, useSpring } from "@react-spring/web";

export function Loading () {

  const props = useSpring({
    from: { x: 0 },
    to: { x: 1 },
    config: { easing: easings.linear, duration: 500 },
    loop: true,
  })

  return (
    <animated.div style={{
      transform: props.x
        .to([0, 1], [0, 360])
        .to(value => `rotateZ(${value}deg)`),
    }}>
      <Loader2 strokeWidth={2.8}/>
    </animated.div> 
  )
}