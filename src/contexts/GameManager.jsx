import { useState } from "react";
import { createPortal } from "react-dom";

import { GameManagerContext } from "./GameManagerContext.js";
import GameSessionEndModal from "../modal/gameSessionEndModal.jsx";

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
    const [sessionEndState, setSessionEndState] = useState({
        winText: "",
        winnerName: "",
    });

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

    function endGameSession(gameWon = false, winnerId = null){
        const winText = gameWon? "Game Won!" : "It's a Draw!";//if a game session is called to end, check if there is a winner or its a draw
        const winnerName = players[winnerId].name; //since the players Ids are the same as their arrat indexes, then just find player data via index number
        setSessionEndState(prevState => {
            const currState = {
                winText,
                winnerName
            }

            return currState;
        });
        // console.log(winText + " " + winnerName);
    }

    function restartGameSession(){
        setCurrentPlayer(players[0]);
        setSessionEndState({
            winText: "",
            winnerName: "",
        });
    }

    const gameData = {
        currentPlayer,
        players,
        switchCurrentPlayer,
        changePlayerName,
        endGameSession,
        restartGameSession
    }

    return(
        <GameManagerContext.Provider value={gameData}>
            {children}
            {sessionEndState.winText!="" && createPortal(<GameSessionEndModal headerText={sessionEndState.winText} winnerName={sessionEndState.winnerName} />, document.getElementById("modal-root"))}
        </GameManagerContext.Provider>
    );
}