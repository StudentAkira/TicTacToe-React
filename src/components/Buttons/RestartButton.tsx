import "./RestartButton.css" 


export default function RestartButton(props: propsItems) {
  return (
    <>
      <button onClick={props.restartGame} className={props.gameResult !== null?"visible":"hidden"}>New Game</button>
    </>
  )
}

export interface propsItems {
  restartGame : () => void 
  gameResult : string | null
}