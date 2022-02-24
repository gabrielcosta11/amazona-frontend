import {React, useEffect} from "react";
import { useParams, useLocation, useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from "../../actions/cartActions";

import { Header, Footer } from "../components/Header&Footer";
import './style.scss'
import { Link } from "react-router-dom";

function Cart() {
    const history = useHistory()
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const {id} = params
    const qty = Number(location.search.split("=")[1])
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    const userExists = JSON.parse(localStorage.getItem('userInfo'))


    useEffect(() => {
        if(id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <div className="container">
            <Header/>
            <main>
                <div className="cart-items">
                    <p>Carrinho</p>
                    {
                        cartItems.length === 0 ?
                        <div className="no-items">
                            <p>Você ainda não adicionou nada ao carrinho. <Link to="/">Voltar para loja.</Link></p>
                        </div>
                        :
                        cartItems.map((item) => (
                            <div key={item.product} className="item">
                                <img src={item.image} alt="" />
                                <p>{item.name}</p>
                                <select
                                    value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                >
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                                <p className="price">R$ {item.price}</p>
                                <button className="delete" onClick={() => removeFromCartHandler(item.product)}>Excluir</button>
                            </div>
                        ))
                    }
                </div>
                <div className="total">
                    <p>Total ({cartItems.reduce((a, c) => a + c.qty, 0)} itens): R$ {cartItems.reduce((a, c) => a + c.qty * c.price, 0)}</p>
                    <button 
                        onClick={() => history.push(userExists ? "/shipping" : "/sign-in")}
                        disabled={cartItems.length === 0}
                    >
                            Realizar Compra
                    </button>
                </div>
            </main>
        </div>
    )
}

export {Cart}