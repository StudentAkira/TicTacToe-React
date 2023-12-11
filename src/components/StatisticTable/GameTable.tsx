import { Game } from '../Field/Interfaces'
import './GameTable.css'

function GameTable(props : propItems) {

  return (
    <div className="results_wrapper">
      <h1> :: HISTORY :: </h1>
      {
        props.games.map(
          (game, index) => {
            return (<h2 key={index}>{game.result_code}, {game.result_description}, {index}</h2>)
          }
        )
      }
    </div>
  )
}

export default GameTable

interface propItems {
  games: Array<Game>
}