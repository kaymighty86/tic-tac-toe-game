import { createContext } from "react";

export const GameManagerContext = createContext(
    {//this is just an object that represents the layout of the context, it serves no purpose other than to assist with prop suggestion when consuming the context
        currentPlayer: {},
        players: [{id: 0, name: "", symbol: ""}],
        switchCurrentPlayer: ()=>{},
        playersInputs: [],
        handlePlayerInput: ()=>{},
        inputLogs: [{playerId: 0, row: 0, col: 0}],
        changePlayerName: (id = 0, newName = "")=>{},
        endGameSession: (gameWon = false, winnerId = 0)=>{},
        restartGameSession: ()=>{}
    }
);