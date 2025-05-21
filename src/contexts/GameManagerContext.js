import { createContext } from "react";

export const GameManagerContext = createContext(
    {//this is just an object that represents the layout of the context, it serves no purpose other than to assist with prop suggestion when consuming the context
        currentPlayer: {},
        players: [],
        switchCurrentPlayer: ()=>{},
        playersInputs: [],
        handlePlayerInput: ()=>{},
        changePlayerName: (id = 0, newName = "")=>{},
        endGameSession: (gameWon = false, winnerId = 0)=>{},
        restartGameSession: ()=>{}
    }
);