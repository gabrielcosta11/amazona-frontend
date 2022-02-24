import './style.scss'
import {Header, Footer} from '../components/Header&Footer/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { detailsOrder, listOrderMine } from '../../actions/orderActions';
import { useHistory } from 'react-router-dom';


function OrderHistory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const orderMineList = useSelector((state) => state.orderMineList);
    const {loading, error, orders} = orderMineList;

    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch]);

    return (
        <div className="container order-history">
            <Header />
            {
                error || !orders ? (<></>) : (
                    <main>
                        <h3>Histórico de Pedidos</h3>
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
                                                ? order.deliveredAt.substring(0, 10)
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
    );
};

export {OrderHistory}