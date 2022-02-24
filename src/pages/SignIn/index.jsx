import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { signin, signout } from '../../actions/userActions';
import {Header, Footer} from '../components/Header&Footer/index'
import './style.scss'


function SignIn() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo, error} = userSignin;

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    return (
        <div className="container">
            <Header/>
            <div id="main">
                <form onSubmit={submitHandler}>
                    <h3>Sign In</h3>
                    {
                        error ?
                        <div className="error">{error}</div>
                        :
                        null
                    }
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Insira seu Email"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            id="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Insira sua Senha"
                        />
                    </div>
                    <button type="submit">Entrar</button>
                    <p className="new-client">Novo cliente? <Link to="/register">Faça o seu cadastro</Link></p>
                </form>
            </div>
        </div>
    )
}

export {SignIn}