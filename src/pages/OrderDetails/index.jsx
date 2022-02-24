import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { deliverOrder, detailsOrder } from '../../actions/orderActions.js';
import { ORDER_DELIVER_RESET } from '../../constants/orderConstants.js';
import { Header } from '../components/Header&Footer/index.jsx';
import {DefaultButton} from '../components/DefaultButton/index.jsx'
import './style.scss'


function OrderDetails() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading} = orderDetails;
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin;
    const orderDeliver = useSelector(state => state.orderDeliver)
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver
    } = orderDeliver;

    const fullAddressMaker = (address) => {
        const fullAddress = `${address.logradouro}, ${address.numero} - ${address.bairro}, ${address.localidade} - ${address.uf}, ${address.CEP}`;

        return fullAddress;
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }

    useEffect(() => {
        dispatch(detailsOrder(id));

        if(successDeliver) {
            dispatch({type: ORDER_DELIVER_RESET})
        }
    }, [id, dispatch, successDeliver]);

    return (
      <div className="container order-details">
        <Header/>
        {loading ? 
            (<></>) : 
            (
                <main>
                    <section className="section">
                    <div className="shipping">
                        <p className="title bold">Endereço de Envio</p>
                        <p>
                        <span className="bold">Nome:</span> {order.shippingAddress.fullName}
                        </p>
                        <p>
                        <span className="bold">Endereço:</span> {fullAddressMaker(order.shippingAddress)}
                        </p>
                    </div>
                    <div className="order-items">
                        <p className="title bold">Itens do Pedido</p>
                        {order.orderItems.map((item) => (
                        <div className="item" key={item.product}>
                            <img src={item.image} alt="" />
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            <p>
                            {item.qty} X R$ {item.price} = R$ {item.qty * item.price}
                            </p>
                        </div>
                        ))}
                    </div>
                    </section>
                    <aside>
                        <div className="order-summary">
                            <p className="title bold">Detalhes do Pedido</p>
                            <div>
                                <p>Itens</p>
                                <p>
                                    {order.itemsPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p>Fréte</p>
                                <p>
                                    {order.freightPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="bold">Total</p>
                                <p className="bold">
                                    {order.totalPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className='bold'>Método de Pagamento</p>
                                <p>{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className='bold'>Entregue</p>
                                <p>
                                    {
                                        order.isDelivered ?
                                            "Sim" :
                                            "Não"
                                    }
                                </p>
                            </div>
                            {
                                userInfo.isAdmin && !order.isDelivered && (
                                    <DefaultButton
                                        onClick={deliverHandler}
                                    >
                                        Produto Entregue
                                    </DefaultButton>
                                )
                            }
                        </div>
                    </aside>
                </main>
            )
        }
      </div>
    );
};

export {OrderDetails}