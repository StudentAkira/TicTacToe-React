import "./Cell.css"


export default function Cell(props: CellOptions) {
  return ( 
    <div className="cell" id={props.id} onClick={()=>{props.handleClick(+props.id)}}>
      {props.svg_element}
    </div>
  );
}

export interface CellOptions {
  key: number;
  id: string;
  value: string;
  handleClick: (index: number) => void;
  svg_element: JSX.Element;
}