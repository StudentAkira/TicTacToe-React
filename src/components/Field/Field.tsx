import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";

import Cross from "../Svg/Cross"
import Circle from "../Svg/Circle"

import "./Field.css"


export default function Field() {

  const playerCross = {symbol : PlayerSymbol.Cross}
  const playerCircle = {symbol : PlayerSymbol.Circle}

  const [cells, setCells] = useState(new Array(9).fill(""));
  const [svgs, setSvgs] = useState(new Array(9).fill(""))

  const [winner, setWinner] = useState<Player>();
  const [player, setPlayer] = useState(playerCircle);//TODO default init must be understandble

  const svg_coices = {
    Cross : <Cross/>,
    Circle: <Circle/>,
  }

  useEffect(() => {
    if (checkWin(player.symbol)){
      console.log("WINNER IS :: ", player);
      setWinner((player) => player);
      return;
    }

    setPlayer(player.symbol === PlayerSymbol.Cross?() => playerCircle :()=> playerCross); 
    
  }, [cells]);

  const nextGameRound = (index: number) => {
    if (cells[index]){
      return;
    }
    setCells((cells) => {
      cells[index] = player.symbol;
      return [...cells];
    })
    setSvgs((svgs)=>{
      svgs[index] = svg_coices[player.symbol];
      return [...svgs]
    })
  }

  const checkWin = (symbol : string) => {
    console.log(cells, symbol, cells[0] == symbol && cells[1] == symbol && cells[2] == symbol);
    
    if (
      cells[0] == symbol && cells[1] == symbol && cells[2] == symbol ||
      cells[3] == symbol && cells[4] == symbol && cells[5] == symbol ||
      cells[6] == symbol && cells[7] == symbol && cells[8] == symbol ||
      cells[0] == symbol && cells[3] == symbol && cells[6] == symbol ||
      cells[1] == symbol && cells[4] == symbol && cells[7] == symbol ||
      cells[2] == symbol && cells[5] == symbol && cells[8] == symbol ||
      cells[0] == symbol && cells[4] == symbol && cells[8] == symbol ||
      cells[2] == symbol && cells[4] == symbol && cells[6] == symbol
    ) {
      return true;
    }
    return false;
  }
  

  return ( 
    <div className="field" >
      {
        cells.map((value, index) =>(
          <Cell key={index} id={index.toString()} handleClick={(index: number) => {nextGameRound(index)}} value={cells[index]} svg_element={svgs[index]}/>
        ))
      }
      <div className={!winner ? "winner winner__hidden" : "winner"}>Winner {winner?.symbol}</div>
    </div>
  );
}

export enum PlayerSymbol {
  Cross = "Cross",
  Circle = "Circle",
}

export interface Player {
  symbol: PlayerSymbol,
}
