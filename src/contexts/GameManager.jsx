import { useState } from "react";

import { GameManagerContext } from "./GameManagerContext.js";

const defaultPlayers = [
    {
        id: 0,
        name: "Player 1",
        symbol: "X"
    },
    {
        id: 1,
        name: "Player 2",
        symbol: "O"
    }
]

export default function GameManager({children}){
    const [players, setPlayersData] = useState(defaultPlayers);
    const [currentPlayer, setCurrentPlayer] = useState(defaultPlayers[0]);

    function switchCurrentPlayer(){
        setCurrentPlayer(prevPlayer => (prevPlayer.id == players[0].id? players[1] : players[0]));
    }

    function changePlayerName(id, newName = ""){
        if(id != null){//check if id is provided
            setPlayersData(prevData => {
                let currData = prevData.map(playerData => ({...playerData}));
                currData[id].name = newName;

                return currData;
            });
        }
    }

    const gameData = {
        currentPlayer,
        players,
        switchCurrentPlayer,
        changePlayerName
    }

    return(
        <GameManagerContext.Provider value={gameData}>
            {children}
        </GameManagerContext.Provider>
    );
}