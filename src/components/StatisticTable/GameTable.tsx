import { useEffect, useState } from "react";
import './GameTable.css'
import { APIEndpoints } from "../../App";

function GameTable() {

  let games = []//JSON.parse(result)["games"]

  useEffect(() => {

    const getGames = async () => {
      const response = await fetch(APIEndpoints.result, {
        method: 'GET',
        redirect: 'follow',
      })
      games = await response.json()//TODO
    }
    getGames();
  }, [])
  
  
  return (
    <>
      <h1> :: HISTORY :: </h1>
      {
        games.map((game, index) => {
          <h2>{game}, {index}</h2>
        })
      }
    </>
  )
}

export default GameTable
