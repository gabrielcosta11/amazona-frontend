import {Header, Footer} from '../components/Header&Footer/index.jsx'
import {CheckoutSteps} from '../components/CheckoutSteps/index.jsx'
import check from './images/verificado.png'
import './style.scss'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../actions/orderActions.js'


function OrderCompleted() {
    const url = window.location.href.split("?");
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.userSignin)


    console.log(url[1], 'papap')

    useEffect(() => {
        console.log('foi')
        const createOrderHandler = async () => { 
            const {data} = await axios.get(`api/checkout/feedback?${url[1]}`);
            console.log(data)

            if(data)

            cart.itemsPrice = cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0);
            cart.freightPrice = cart.shippingAddress.freight;
            cart.totalPrice = cart.freightPrice + cart.itemsPrice;

            console.log(cart)
            dispatch(createOrder({
                ...cart,
                orderItems: cart.cartItems,
                paymentMethod: data.PaymentMethod,
                paymentId: data.Payment,
                user: user.userInfo._id
            }))
            console.log('final')
        };

        if(url[1]) {
            console.log('chamado')
            createOrderHandler();
        }
    })

    return (
        <div className="container">
            <Header/>
            <CheckoutSteps step1 step2 step3 step4/>
            <div className="main-oc">
                <img src={check} alt="" />
                <h2>Pedido Concluído</h2>
                <h3>Obrigado!</h3>
                <p>
                    Agradecemos pela sua preferência. <Link to="/">Voltar para loja</Link> ou <Link to="/order-history">Meus Pedidos</Link>
                </p>
            </div>
        </div>
    )
}

export {OrderCompleted}