import Styles from "./Button.module.css";

/**
 * @param {string} type Either "fill", "outline", or "text"
 */
export default function Button({type = "fill", className, children, ...others}){

    //select the button type style
    let btnType;
    switch(type){
        case "fill": btnType = Styles.fill;
        break;
        case "outline": btnType = Styles.outline;
        break;
        case "text": btnType = Styles.text;
        break;
        default: btnType = Styles.fill;
        break;
    }

    const classes = `${Styles.button} ${btnType} ${className? className:""}`

    return (
    <button className={classes} {...others}>
        {children}
    </button>
    )
}