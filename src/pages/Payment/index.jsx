import {Header, Footer} from '../components/Header&Footer/index'
import {CheckoutSteps} from '../components/CheckoutSteps/index'
import "../Payment/style.scss"
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useMercadopago } from 'react-sdk-mercadopago';


function Payment() {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress, cartItems} = cart
    const fullAddress = `${shippingAddress.logradouro}, ${shippingAddress.numero} - ${shippingAddress.bairro}, ${shippingAddress.localidade} - ${shippingAddress.uf}, ${shippingAddress.CEP}`
    const freight = shippingAddress.freight
    const [isRendered, setIsRendered] = useState(false)
    const [preferenceId, setPreferenceId] = useState()

    const mp = useMercadopago.v2("TEST-194ab2b6-eaf7-498e-ad53-d97f91649c09", {
        locale: "pt-BR"
    });

    useEffect(() => {
        console.log('EFFECT TODO FOI CHAMADO')
        const createPreferenceId = async () => {
            console.log("FUNÇÃO FOI CHAMADA")
            let items = []
            cartItems.forEach(item => {
                const newItem = {
                    title: item.name,
                    unit_price: item.price,
                    quantity: item.qty
                }
    
                items.push(newItem)
            });
    
            const {data} = await axios.post("/api/checkout/create_preference", {items, freight})
            const {id} = data
    
            console.log(id, "fora do state")
            setPreferenceId(id)
            
            console.log(preferenceId, "id")
        };

        if(!preferenceId) {
            createPreferenceId()
        }

        console.log(preferenceId, "logo antes")
        if (mp && !isRendered && preferenceId) {
            mp.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: ".mp-button",
                    label: 'Pagar',
                }
            });
            setIsRendered(true)
        }
    }, [mp, isRendered, cartItems, preferenceId, freight]);

    return (
        <div className="container">
            <Header/>
            <CheckoutSteps step1 step2 step3/>
            <main>
                <section className="section">
                    <div className="shipping">
                        <p className="title bold">Shipping</p>
                            <p><span className="bold">Name:</span> {shippingAddress.fullName}</p>
                        <p><span className="bold">Address:</span> {fullAddress}</p>
                    </div>
                    <div className="order-items">
                        <p className="title bold">Order Items</p>
                            {
                                cartItems.map(item => (
                                    <div className="item" key={item.product}>
                                        <img src={item.image} alt="" />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <p>{item.qty} X R$ {item.price} = R$ {item.qty * item.price}</p>
                                    </div>
                                ))
                            }
                    </div>
                </section>
                <aside>
                    <div className="order-summary">
                        <p className="title bold">Order Summary</p>
                        <div>
                            <p>Items</p>
                            <p>{(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}</p>
                        </div>
                        <div>
                            <p>Freight</p>
                            <p>{freight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div>
                            <p className="bold">Order Total</p>
                            <p className="bold">{((cartItems.reduce((a, c) => a + c.price * c.qty, 0) + freight)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className="mp-button"></div>
                    </div>
                </aside>
            </main>
        </div>
    )
}

export {Payment}