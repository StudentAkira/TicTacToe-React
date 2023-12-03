import { useEffect, useState } from "react";

import Cell from "../Cell/Cell";
import EndGameBanner from "../EndGameBanner/EndGameBanner";

import "./Field.css"
import { APIEndpoints } from "../../App";


export default function Field() {

  const playerCross : Player = {symbol : PlayerSymbol.Cross}
  const playerCircle : Player = {symbol : PlayerSymbol.Circle}

  const [cells, setCells] = useState<(PlayerSymbol | null)[]>(new Array<PlayerSymbol | null>(9).fill(null));

  const [player, setPlayer] = useState<Player>(playerCircle);
  const [endGameMessage, setEndGameMessage] = useState<string|null>(null);
  
  const sendGameResult = (message : string) => {

    const formdata = new FormData();
    formdata.append("result_code", GameResults[message as keyof typeof GameResults].result_code);
    formdata.append("result_description", GameResults[message as keyof typeof GameResults].result_description);

    console.log(GameResults[message as keyof typeof GameResults].result_code);
    console.log(GameResults[message as keyof typeof GameResults].result_description);
    

    fetch(APIEndpoints.result, {
      method: 'POST',
      body: formdata,
      redirect: 'manual'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    if (checkWin(player.symbol)){
      setEndGameMessage("Player " + player.symbol + " wins");
      sendGameResult("Player " + player.symbol + " wins");
      return;
    }
    if (!cells.includes(null)) {
      setEndGameMessage("Draw");
      sendGameResult("Draw");
    }
  }, [cells]);

  const nextGameRound = (index: number) => {
    console.log(player.symbol);
    
    if (cells[index]){
      return;
    }
    setCells((cells) => {
      cells[index] = player.symbol;
      return [...cells];
    })
  }

  const checkWin = (symbol : string) => {
    console.log(cells, symbol, cells[0] == symbol && cells[1] == symbol && cells[2] == symbol);
    
    setPlayer(player.symbol === PlayerSymbol.Cross?playerCircle:playerCross);
    
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
  
  const restartGame = () => {
    setCells(new Array(9).fill(null));
    setEndGameMessage(null);
    setPlayer(playerCircle);
  }
  return (
    <div className="wrapper">
      <div className="field" >

        {
          <EndGameBanner 
            className={endGameMessage !== null? "visible_banner":"none_banner"} 
            winner={endGameMessage}
            restartGame={restartGame}
            gameResult={endGameMessage}
          />
        }
        {
          cells.map((value, index) =>(
            <Cell 
              key={index} 
              id={index.toString()} 
              handleClick={(index: number) => {nextGameRound(index)}} 
              value={value} 
            />
          ))
        }
      </div>
    </div> 
  );
}

export enum PlayerSymbol {
  Cross = "cross",
  Circle = "circle",
}

export interface Player {
  symbol: PlayerSymbol,
}

export interface Svgs {
  Cross : JSX.Element,
  Circle : JSX.Element,
}

const GameResults = {
  "Player cross wins" : {"result_code" : "0", "result_description": "Cross win"},
  "Player circle wins" : {"result_code" : "1", "result_description": "Circle win"},
  "Draw": {"result_code" : "2", "result_description": "Draw"}
}

