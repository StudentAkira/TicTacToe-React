import { useEffect, useState } from "react";

import Cell from "../Cell/Cell";
import EndGameBanner from "../EndGameBanner/EndGameBanner";
import GameTable from "../StatisticTable/GameTable";

import "./Field.css"

import { Game, Player } from "./Interfaces";
import { PlayerSymbol } from "./Enums";
import { APIEndpoints } from "../../Enums";
import ResultsTableLoadingBar from "../LoadingBars/ResultsTableLoadingBar";



export default function Field() {

  const playerCross : Player = {symbol : PlayerSymbol.Cross}
  const playerCircle : Player = {symbol : PlayerSymbol.Circle}

  const [cells, setCells] = useState<(PlayerSymbol | null)[]>(new Array<PlayerSymbol | null>(9).fill(null));

  const [player, setPlayer] = useState<Player>(playerCircle);
  const [endGameMessage, setEndGameMessage] = useState<string|null>(null);
  const [games, setGames] = useState<Game[]>([]);

  
  const sendGameResult = (message : string) => {

    const formdata = new FormData();
    formdata.append("result_code", GameResults[message as keyof typeof GameResults].result_code);
    formdata.append("result_description", GameResults[message as keyof typeof GameResults].result_description);

    // console.log(GameResults[message as keyof typeof GameResults].result_code);
    // console.log(GameResults[message as keyof typeof GameResults].result_description);
    

    fetch(APIEndpoints.result, {
      method: 'POST',
      body: formdata,
      redirect: 'manual'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const getGames = async () => {
    setLoading(true);
    const response = await fetch(APIEndpoints.result, {
      method: 'GET',
      redirect: 'manual',
    })
    const fetched_games = await response.json();
    setLoading(false);
    setGames(fetched_games["games"])
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGames();
  }, [])

  useEffect(() => {
    if (!cells.includes(null) || checkWin(player.symbol)){
      setTimeout(getGames, 500);
    }
    if (checkWin(player.symbol)){
      setEndGameMessage("Player " + player.symbol + " wins");
      sendGameResult("Player " + player.symbol + " wins");
      return;
    }
    if (!cells.includes(null)) {
      setEndGameMessage("Draw");
      sendGameResult("Draw");
    }
    setPlayer(player.symbol === PlayerSymbol.Cross?playerCircle:playerCross);
  }, [cells]);

  const nextGameRound = (index: number) => {
    // console.log(player.symbol);
    
    if (cells[index]){
      return;
    }
    setCells((cells) => {
      cells[index] = player.symbol;
      return [...cells];
    })
  }

  const checkWin = (symbol : string) => {
    // console.log(cells, symbol, cells[0] == symbol && cells[1] == symbol && cells[2] == symbol);
    
    
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
      <div className="field_wrapper">
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
      {loading?<ResultsTableLoadingBar />:<GameTable games={games} />}
    </div>
  );
}

const GameResults = {
  "Player cross wins" : {"result_code" : "0", "result_description": "Cross win"},
  "Player circle wins" : {"result_code" : "1", "result_description": "Circle win"},
  "Draw": {"result_code" : "2", "result_description": "Draw"}
}

