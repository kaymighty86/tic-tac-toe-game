import Styles from "./GameBoard.module.css";

import { useContext, useEffect } from "react";
import { GameManagerContext} from "../contexts/GameManagerContext.js";
import { analyseInputs } from "../gameLogic.js";

export default function GameBoard(){
    const {players, playersInputs, handlePlayerInput, endGameSession} = useContext(GameManagerContext);//import the game data

    useEffect(()=>{//useEffect() is used here because we want to run this operation after the component has completely re-executed, else it will cause a bad state call if we are telling the parent to re-render before this comonent even finishes rendering
        //check if the game is won based on the last input (by the prev player)
        const inputAnalysis = analyseInputs(playersInputs);
        if(inputAnalysis.gameWon){
            endGameSession(inputAnalysis.gameWon,inputAnalysis.winner);
        }
        else{
            //check if the board is full (if there is no null cell left)
            let rowWithNullCol;
            playersInputs.forEach(row => row.forEach(col => {
                if(col == null){
                    rowWithNullCol = row;
                }
            }));

            if(rowWithNullCol == undefined){//if there are no more rows with "null" cols, then the board is full
                endGameSession(false, null);//end game with no winner
            }
        }
        //----------------------------
    }, [playersInputs]);

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