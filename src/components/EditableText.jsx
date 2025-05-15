import Styles from "./EditableText.module.css";

import { useState } from "react";

/**
 * A text display compoenent whose value can be edited and saved (the state changes from normal paragraph text to editable input)
 * @param {string} defaultValue default value of the text component
 * @param {object} onTextChange call-back function that is executed after saving a new value to the text. It passes new value as parameter 
 */
export default function EditableText({defaultValue, onTextChange}){
    const [value, setValue] = useState(defaultValue);
    const [isEditable, setIsEditable] = useState(false);

    function handleEditStateChange(){
        setIsEditable(prevState => !prevState);//switch between true and false relative to what the previous state value is every time the button is clicked
    }

    function handleInput(event){
        const currentInputValue = event.target.value;

        setValue(currentInputValue);//set the input value as the general value of the component
        onTextChange && onTextChange(currentInputValue);//execute this call-back function too if its defined to notify any component that needs to know that the value will change
    }

    return (
        <span className={Styles.editableText}>
            {
                isEditable? 
                <input type="text" value={value} onChange={handleInput} autoFocus/> : 
                <p>{value}</p>
            }
            
            <button onClick={handleEditStateChange}>{isEditable? "Save" : "Edit"}</button>
        </span>
    )
}