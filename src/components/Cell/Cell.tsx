import { PlayerSymbol } from "../Field/Field";
import PlayerMark from "../PlayerMark/PlayerMark";
import "./Cell.css"


export default function Cell(props: CellOptions) {
  return ( 
    <div className="cell" id={props.id} onClick={()=>{props.handleClick(+props.id)}}>
      <PlayerMark type={props.value}/>
    </div>
  );
}

export interface CellOptions {
  key: number;
  id: string;
  value: PlayerSymbol | null;
  handleClick: (index: number) => void;
}