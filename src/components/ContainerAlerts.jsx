import { useGlobalContext } from "../context/context"
import { Alert } from "./Alert"
import { animated, useTransition } from "@react-spring/web"

export function ContainerAlerts () {

  const {alerts} = useGlobalContext()
  const alertsInverted = alerts.reverse()
  const alertsAnimated = useTransition(alerts, {
    from: {opacity: 0 },
    enter: {opacity: 1 },
    leave: {opacity: 0 },
  })

  return (
    <section className="absolute top-10 right-10 z-50 flex flex-col gap-5">
      {alertsAnimated((style, item) => (
        <animated.div style={style}>
          <Alert type={item.type} message={item.message}/>
        </animated.div>
      ))}
    </section>
  )
}