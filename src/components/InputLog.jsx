import Styles from "./InputLog.module.css";

export default function InputLog({log = []}){
    return (
        log.map((actions, id) => <p>Action Text</p>)
    );
}