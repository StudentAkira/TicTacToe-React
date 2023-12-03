import RestartButton from "../Buttons/RestartButton"
import "./EndGameBanner.css" 


function EndGameBanner(props : propsFields) {
  return (
    <div className={props.className + " " + "end_game_banner"} >
      {props.winner}
      <RestartButton restartGame={props.restartGame} gameResult={props.gameResult}/>
    </div>
  )
}

export default EndGameBanner

export interface propsFields {
  className : string,
  winner : string | null,
  restartGame : () => void 
  gameResult : string | null
}