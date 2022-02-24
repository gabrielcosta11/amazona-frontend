import {Link} from 'react-router-dom'
import { RatingStars } from '../RatingStars'

function DisplayProduct(props) {
    const {product} = props

    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img className="img-card" src={product.image} alt="" />
            </Link>
            <div className="footer-card">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
                <RatingStars
                    rating={4}
                />
                <p>{`R$ ${product.price}`}</p>
            </div>
        </div>
    )
};

export default DisplayProduct