import Styles from "./PlayersSection.module.css";
import PlayerDetails from "./PlayerDetails";

import { GameManagerContext } from "../contexts/GameManagerContext.js";
import { useContext } from "react";

export default function PlayersSection(){

    const {currentPlayer, players} = useContext(GameManagerContext);

    return (
        <div className={Styles.playersDetailsSection}>
            {
                players.map((player, id) => 
                    <PlayerDetails key={id} playerData={player} currentTurn={player.id == currentPlayer.id}/>
                )
            }
        </div>
    );
}