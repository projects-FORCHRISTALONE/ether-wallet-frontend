// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE
// BY GOD'S GRACE ALONE


const Button = ({text, command,variant}) => {
    return (
        <>
            <button
                onClick={command}
                // id = "gtljc_connect_btn"
                className={ `gtljcModularButton_1 gtljcModularButton_${variant} w-[10vh]`}
                type="submit"
            >
                {text}
            </button>
        </>
    )
}

export default Button;