import {Link} from 'react-router-dom'
import { RatingStars } from '../RatingStars'
import './style.scss'

function DisplayProduct(props) {
    const {product} = props

    return (
        <div key={product._id} className="card display-product">
            <Link to={`/product/${product._id}`}>
                <img className="img-card" src={product.image} alt="" />
            </Link>
            <div className="footer-card">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
                {
                    product.numReviews > 0
                    ?
                    <div className="rating">
                        <RatingStars
                            rating={product.rating}
                        />
                        <p className='rating-comment'>{product.numReviews} comentários</p>
                    </div>
                    :
                    <p className='rating-comment'>Sem comentários</p>
                }
                <p>{`R$ ${product.price}`}</p>
            </div>
        </div>
    )
};

export default DisplayProduct