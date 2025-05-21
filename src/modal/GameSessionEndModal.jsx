import Styles from "./gameSessionEndModal.module.css";

import Button from "../components/UI/Button";

export default function GameSessionEndModal({headerText = "", winnerName, handleRestart = ()=>{}}){

    return (
        <div className={Styles.gameEndModal}>
            <h1>{headerText}</h1>
            {winnerName != "" && <p>{`${winnerName} won the game`}</p>}
            <Button type="fill" onClick={handleRestart}>Rematch!</Button>
        </div>
    );
}