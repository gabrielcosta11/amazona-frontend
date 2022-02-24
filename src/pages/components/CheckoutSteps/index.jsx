import './style.scss'


function CheckoutSteps(props) {
    return (
        <div className="checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Sign-In</div>
            <div className={props.step2 ? 'active' : ''}>Endereço</div>
            <div className={props.step3 ? 'active' : ''}>Pagamento</div>
            <div className={props.step4 ? 'active' : ''}>Pedido Concluído</div>
        </div>
    )
}

export {CheckoutSteps}

