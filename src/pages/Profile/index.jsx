import './style.scss'
import {Header, Footer} from '../components/Header&Footer/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { updateUserProfile, detailsUser } from '../../actions/userActions';
import { refresh } from 'react-router-dom';
import {USER_UPDATE_PROFILE_RESET} from "../../constants/userConstants"




function Profile() {
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state) => state.userDetails)
    const {user} = userDetails;

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const {
        error: errorUpdate, 
        loading: loadingUpdate, 
        success: successUpdate
    } = useSelector((state) => state.userUpdateProfile)

    useEffect(() => {
        console.log(userInfo._id)
        if(!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("A senha e senha de confirmação não são iguais")
        } else {
            console.log(user._id, "")
            dispatch(updateUserProfile({userId: user._id, name, email, password}))
        }
    };

    return (
        <div className='container profile'>
            <Header/>
            {}
                <main>
                    <form onSubmit={submitHandler}>
                        <h3>Perfil de Usuário</h3>
                        <div className="field">
                            <label htmlFor="name">Nome</label>
                            <input 
                                type="text" 
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Insira seu Nome"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Insira seu Email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password" 
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Insira sua Senha"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">
                                Senha de Confirmação
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirme sua Senha"
                            />
                        </div>
                        <button type="submit">Atualizar</button>
                    </form>
                </main>
        </div>
    )
};

export {Profile}