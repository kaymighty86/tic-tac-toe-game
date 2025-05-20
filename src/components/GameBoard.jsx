import Styles from "./GameBoard.module.css";

import { useState, useContext, useEffect } from "react";
import { GameManagerContext} from "../contexts/GameManagerContext.js";
import { analyseInputs } from "../gameLogic.js";

//predefining the players inputs array which represents the cell selections by the players
const defaultPlayersInputs = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

export default function GameBoard(){

    const {currentPlayer, players, switchCurrentPlayer, endGameSession} = useContext(GameManagerContext);//import the game data
    const [playersInputs, updatePlayersInputs] = useState(defaultPlayersInputs);//array representing the map of the player inputs

    useEffect(()=>{//useEffect() is used here because we want to run this operation after the component has completely re-executed, else it will cause a bad state call if we are telling the parent to re-render before this comonent even finishes rendering
        //check if the game is won based on the last input (by the prev player)
        const inputAnalysis = analyseInputs(playersInputs);
        if(inputAnalysis.gameWon){
            // console.log(`${players[inputAnalysis.winner].name} wins this round!`);
            endGameSession(inputAnalysis.gameWon,inputAnalysis.winner);
        }
        //----------------------------
    }, [playersInputs]);
    
    function handlePlayerInput(rowId, colId){
        //only recognise the input if the referenced cell does not contain any input
        if(playersInputs[rowId][colId] == null){
            updatePlayersInputs(prevPlayersInputs => {
                const currentInputs = prevPlayersInputs.map(row => row.map(col => col));
                currentInputs[rowId][colId] = currentPlayer.id;

                return currentInputs;
            });

            switchCurrentPlayer();
        }
    }

    return (
        <table className={Styles.gameBoard}>
            <tbody>
                {playersInputs.map((row, rowID) => 
                    <tr key={rowID}>
                        {row.map((col, colId) => 
                            <td key={colId}>
                                <button onClick={() => {handlePlayerInput(rowID,colId)}}>
                                    {col != null? players[col].symbol : null}{/*if there is a player ID in the cell, get the symbol of the player*/}
                                </button>
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}