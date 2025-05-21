import { useState } from "react";
import { createPortal } from "react-dom";

import { GameManagerContext } from "./GameManagerContext.js";
import GameSessionEndModal from "../modal/gameSessionEndModal.jsx";

//predefining the players inputs array which represents the cell selections by the players
const defaultPlayersInputs = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

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
    const [playersInputs, updatePlayersInputs] = useState(defaultPlayersInputs);//array representing the map of the player inputs
    const [inputLogs, setInputLogs] = useState([]);
    const [sessionEndState, setSessionEndState] = useState({
        winText: "",
        winnerName: "",
    });

    function handlePlayerInput(rowId, colId){
        //only recognise the input if the referenced cell does not contain any input and if the game has not ended
        if(playersInputs[rowId][colId] == null && sessionEndState.winText == ""){
            updatePlayersInputs(prevPlayersInputs => {
                const currentInputs = prevPlayersInputs.map(row => row.map(col => col));
                currentInputs[rowId][colId] = currentPlayer.id;

                return currentInputs;
            });

            //update the input logs
            setInputLogs(prevLogs => {
                const currLogs = prevLogs.map(log => ({...log}));
                currLogs.push({
                    playerId: currentPlayer.id,
                    row: rowId,
                    col: colId
                });

                return currLogs;
            });

            //switch player
            switchCurrentPlayer();
        }
    }

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
        const winnerName = gameWon? players[winnerId].name : ""; //since the players Ids are the same as their arrat indexes, then just find player data via index number
        setSessionEndState({
            winText,
            winnerName
        });
    }

    function restartGameSession(){
        //reset all the key states
        updatePlayersInputs(defaultPlayersInputs);
        setCurrentPlayer(players[0]);
        setSessionEndState({
            winText: "",
            winnerName: "",
        });
        setInputLogs([]);
    }

    const gameData = {
        currentPlayer,
        players,
        switchCurrentPlayer,
        playersInputs,
        handlePlayerInput,
        inputLogs,
        changePlayerName,
        endGameSession,
        restartGameSession,
    }

    return(
        <GameManagerContext.Provider value={gameData}>
            {children}
            {sessionEndState.winText!="" && createPortal(<GameSessionEndModal headerText={sessionEndState.winText} winnerName={sessionEndState.winnerName} handleRestart={restartGameSession} />, document.getElementById("modal-root"))}
        </GameManagerContext.Provider>
    );
}