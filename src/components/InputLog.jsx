import Styles from "./InputLog.module.css";

import { useContext } from "react";
import { GameManagerContext } from "../contexts/GameManagerContext";

export default function InputLog(){
    const {inputLogs, players} = useContext(GameManagerContext);

    return (
        <section className={Styles.logsSection}>
            {inputLogs.map((action, id) => 
                <p key={id} >{`${players[action.playerId].name} played [${players[action.playerId].symbol}] at cell ${action.row},${action.col}`}</p>
            )}
        </section>
    );
}