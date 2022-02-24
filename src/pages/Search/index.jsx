import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../../actions/productActions'
import './style.scss'
import { Header } from '../components/Header&Footer'
import DisplayProduct from '../components/DisplayProducts'

function Search(props) {
    const {name = 'all'} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts({ name: name !== 'all' ? name : '' }))
    }, [dispatch, name])

    return(
        <div className="search container">
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
        </div>
    )
};

export {Search}

