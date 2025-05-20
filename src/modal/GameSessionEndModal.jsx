import Styles from "./gameSessionEndModal.module.css";

import Button from "../components/UI/Button";

export default function GameSessionEndModal({headerText = "", winnerName}){

    return (
        <div className={Styles.gameEndModal}>
            <h1>{headerText}</h1>
            <p>{`Winner: ${winnerName}`}</p>
            <Button type="fill">Rematch!</Button>
        </div>
    );
}