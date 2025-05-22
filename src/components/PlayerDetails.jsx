import Styles from "./PlayerDetails.module.css";
import { useState, useContext } from "react";

import EditableText from "./UI/EditableText";
import { GameManagerContext } from "../contexts/GameManagerContext.js";

export default function PlayerDetails({playerData, currentTurn = false}){
    const [isEditable, setIsEditable] = useState(false);
    const [playerName, editPlayerName] = useState(playerData.name)

    const {changePlayerName} = useContext(GameManagerContext);

    function handlePlayerNameInput(event){
        editPlayerName(event.target.value);
    }

    function handleEditSwitch(toSave){
        if(toSave)
            changePlayerName(playerData.id, playerName);//inform the game manager
        setIsEditable(prevState => !prevState);//switch between true and false relative to what the previous state value is every time the button is clicked
    }

    return (
        <span className={`${Styles.playerDetails} ${currentTurn? Styles.currentTurn : ""}`}>
            <p>{`[ ${playerData.symbol} ]`}</p>
            <EditableText isEditable={isEditable} value={playerName} onChange={handlePlayerNameInput} className={Styles.editableText}/>
            <button onClick={()=>handleEditSwitch(isEditable)}>{isEditable? "Save" : "Edit"}</button>
        </span>
    );
}