import Styles from "./EditableText.module.css";

/**
 * A text display component whose state changes from normal paragraph text to editable input for absolute uneditability when its not in editable state
 * @param {string} value default value of the text component
 * @param {object} onChange call-back function that is executed on every key stoke if the element is in editable state 
 * @param {boolean} isEditable boolean parameter for specifying if the component should be in editable state or not
 */
export default function EditableText({value = "", onChange, isEditable = false, className, ...otherInputProps}){

    const classNames = `${Styles.editableText} ${isEditable? Styles.isEditable :""} ${className && className}`;

    return (
        <span className={classNames}>
            {
                isEditable? 
                <input type="text" value={value} onChange={onChange} {...otherInputProps} onFocus={(event)=>event.target.select()} autoFocus /> //the onFocus event automatically selects/highlight all the text in the input element when its in focus
                : <p>{value}</p>
            }
        </span>
    )
}