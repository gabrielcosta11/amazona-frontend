import "./style.scss"

function DefaultButton(props) {
    return (
        <button 
            className="default-button"
            onClick={props.onClick}
            type={props.type ? props.type : 'button'}
        >
            {props.children}
        </button>
    )
};

export {DefaultButton}