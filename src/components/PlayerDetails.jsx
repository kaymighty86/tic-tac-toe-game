import Styles from "./PlayerDetails.module.css";
import { useState, useContext } from "react";

import EditableText from "./UI/EditableText";
import { GameManagerContext } from "../contexts/GameManagerContext.js";

export default function PlayerDetails({playerData, currentTurn = false}){
    const [isEditable, setIsEditable] = useState(false);

    const {changePlayerName} = useContext(GameManagerContext);

    function handleEditStateChange(){

        setIsEditable(prevState => !prevState);//switch between true and false relative to what the previous state value is every time the button is clicked
    }

    function handlePlayerNameInput(event){
        changePlayerName(playerData.id ,event.target.value);
    }

    return (
        <span className={`${Styles.playerDetails} ${currentTurn? Styles.currentTurn : ""}`}>
            <p>{`[ ${playerData.symbol} ]`}</p>
            <EditableText isEditable={isEditable} value={playerData.name} onChange={handlePlayerNameInput} className={Styles.editableText}/>
            <button onClick={handleEditStateChange}>{isEditable? "Save" : "Edit"}</button>
        </span>
    );
}