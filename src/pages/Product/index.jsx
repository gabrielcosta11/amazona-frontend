import {Link, useParams, useHistory} from "react-router-dom"
import data from '../../components/data'
import {useDispatch, useSelector} from 'react-redux'
import {createReview, detailsProduct} from '../../actions/productActions'

import {Header, Footer} from "../components/Header&Footer/index"

import "./style.scss"
import { useEffect, useState } from "react"
import { PRODUCT_REVIEW_CREATE_RESET } from "../../constants/productConstants"
import { DefaultButton } from "../components/DefaultButton"
import { RatingStars } from "../components/RatingStars"

function Product() {
    const history = useHistory()
    const params = useParams()
    const {id} = params
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const {error, loading, product} = productDetails;

    const userSignin = useSelector((state) => state.userSignin)
    const {
        loading: loadingUser,
        error: errorUser,
        userInfo,
    } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    useEffect(() => {
        if(successReviewCreate) {
            window.alert('Comentário Postado')
            setRating('')
            setComment('')
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET})
        }

        dispatch(detailsProduct(id))
    }, [dispatch, id, successReviewCreate])

    function addToCartHandler() {
        history.push(`/cart/${id}?qty=${qty}`)
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if(comment && rating) {
            dispatch(createReview(id, {
                comment, 
                userName: userInfo.name, 
                userId: userInfo._id,
                rating,
            }))
        } else {
            alert('Por Favor preencha todos os campos')
        }
    }

    return (
        <div className="container">
            <Header/>
            {
                product ?
                (
                    <main className="main">
                        <div>
                            <Link className="back-home" to="/">Voltar para tela principal</Link>
                        </div>
                        <section>
                            <img className="image" src={product.image} alt=""/>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>Preço: R$ {product.price}</p>
                                <p>Descrição: {product.description}</p>
                                <div className="rating">
                                    <p>Avaliação:</p>
                                    {
                                        product.numReviews > 0
                                        ?
                                        <div className="rating-star">
                                            <RatingStars
                                                rating={product.rating}
                                            />
                                            <p className='rating-comment'>{product.numReviews} comentários</p>
                                        </div>
                                        :
                                        <p className='rating-comment'>Sem comentários</p>
                                    }
                                </div>
                            </div>
                            <div className="add-cart">
                                <div>
                                    <div className="price">
                                        <p>Preço</p>
                                        <p>R$ {product.price}</p>
                                    </div>
                                    <div className="status">
                                        <p>Status</p>
                                        <p className={product.countInStock === 0 ? "sold-off" : null}>
                                            {product.countInStock > 0 ? "Em estoque" : "Esgotado"}
                                        </p>
                                    </div>
                                    <div className={product.countInStock === 0 ? "none" : "quantity"}>
                                        <p>Quantidade</p>
                                        <select 
                                            value={qty}
                                            onChange={(e) => {setQty(e.target.value)}}
                                        >
                                            {
                                                [...Array(product.countInStock).keys()].map(x => {
                                                    return (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <button 
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                </div>
                            </div>
                        </section>
                        {
                            userInfo ?
                                (
                                    <div className="review-form">
                                        <form onSubmit={(e) => submitHandler(e)}>
                                            <h3>Faça um Comentário</h3>
                                            <div className="field">
                                                <label htmlFor="rating">O que achou?</label>
                                                <select 
                                                    id="rating"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="">Selecionar...</option>
                                                    <option value="1">1- Muito Ruim</option>
                                                    <option value="2">2- Insatisfatório</option>
                                                    <option value="3">3- Bom</option>
                                                    <option value="4">4- Muito Bom</option>
                                                    <option value="5">5- Incrível</option>
                                                </select>
                                            </div>
                                            <div className="field">
                                                <label htmlFor="comment">Comentário</label>
                                                <textarea 
                                                    id="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </div>
                                            <DefaultButton type="submit">Comentar</DefaultButton>
                                            <p>{errorReviewCreate}</p>
                                        </form>
                                    </div>
                                )
                                :
                                (
                                    <p>
                                        Apenas usuários pode fazer comentários. <Link to='/sign-in'>Faça seu login</Link>
                                    </p>
                                )
                            }
                        <div className="reviews">
                            <h2>Comentários</h2>
                            {
                                product.reviews.length === 0 && (
                                    <p>Não há comentários</p>
                                )
                            }
                            {
                                product.reviews.map((review) => (
                                    <div className="review" key={review._id}>
                                        <div className="name-and-date">
                                            <p className="name">
                                                {review.userName}
                                            </p>
                                            <p className="date">
                                                {
                                                    new Date(review.createdAt)
                                                    .toLocaleDateString('pt-BR', {timeZone: 'UTC'})
                                                }
                                            </p>
                                        </div>
                                        <p>
                                            {<RatingStars rating={review.rating} />}
                                        </p>
                                        <p className="comment">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </main>                   
                ) : 
                (
                    <></>
                )
            }
            <Footer/>
        </div>
    )
}

export {Product}