import React, {useEffect} from 'react'
import './style.scss'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { listOrders } from '../../actions/orderActions';
import { Header } from '../components/Header&Footer';

function OrderList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList;

    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])

    return (
        <div className="container order-list">
            <Header/>
            {
                error || !orders ? (<></>) : (
                    <main>
                        <h3>Lista de Pedidos</h3>
                        <table>
                            <thead>
                                <tr className="row">
                                    <th>ID</th>
                                    <th>Data</th>
                                    <th>Total</th>
                                    <th>Entregue</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        {
                                            new Date(order.createdAt)
                                                .toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.isDelivered
                                                ? new Date(order.deliveredAt.substring(0, 10))
                                                .toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                                                : "Não"
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => history.push(`/order-details/${order._id}`)}
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                )
            }
        </div>
    )
};

export {OrderList}