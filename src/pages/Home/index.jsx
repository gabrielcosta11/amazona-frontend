import './style.scss';

import DisplayProduct from '../components/DisplayProducts';

import {Header, Footer} from "../components/Header&Footer/index"
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../../actions/productActions';


function Home() {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    console.log(productList)

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div className="container">
            <Header/>
            <main>
                <div className="all-cards">
                    {
                        products.map((product) => (
                            <DisplayProduct key={product._id} product={product}/>
                        ))
                    }
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export {Home}