import { PlayerSymbol } from "../Field/Enums"
import "./PlayerMark.css" 


export default function PlayerMark(props: PropsItems) {

  return (
    <>
      { props.type ? <img src={`src/assets/${props.type}.svg`} /> : null}
    </>
  )
}

export interface PropsItems {
  type: PlayerSymbol | null,
}
