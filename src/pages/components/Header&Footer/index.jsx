import { useDispatch, useSelector } from "react-redux"
import {Link} from "react-router-dom"
import "./style.scss"
import arrowIcon from './img/down-arrow.svg'
import { signout } from "../../../actions/userActions"
import {SearchBox} from '../SearchBox/index.jsx'

function Header() {
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout())
    }

    return(
        <header>
            <div>
                <Link to='/' className="logo link"
                >amazona</Link>
            </div>
            <div>
                <SearchBox></SearchBox>
            </div>
            <div>
                <Link to="/cart" className="link">Carrinho{cartItems.length > 0 && <span>{cartItems.length}</span>}</Link>
                {
                    userInfo ? 
                    <div className="user">
                        <Link to="#" className="link user-name">{userInfo.name}</Link>
                        <ul className="list">
                            <li><Link to="/#signout" className="link" onClick={signoutHandler}>Sign Out</Link></li>
                            <li><Link to="/order-history" className="link">Meus Pedidos</Link></li>
                            <li><Link to="/profile" className="link">Perfil do Usuário</Link></li>
                        </ul>
                    </div>
                    :
                    <Link to="/sign-in" className="link">Sign In</Link>
                }
                {
                    userInfo && userInfo.isAdmin ?
                    <div className="user">
                        <Link to="#" className="link">Administrador</Link>
                        <ul className="list">
                            <li><Link to="/dashboard" className="link">Dashboard</Link></li>
                            <li><Link to="/order-list" className="link">Pedidos</Link></li>
                            <li><Link to="/product-list" className="link">Produtos</Link></li>
                            <li><Link to="/user-list" className="link">Usuários</Link></li>
                        </ul>
                    </div>
                    :
                    <></>
                }
            </div>
        </header>
    )
}

function Footer() {
    return (
            <footer>
                All right reserved
            </footer>
    )
}

export {Header, Footer}