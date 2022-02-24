import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userActions";
import { Header } from "../components/Header&Footer";
import "./style.scss";

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const {userInfo, error} = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      window.alert('Sua senha e senha de confirmação não são iguais.')
    } else {
      dispatch(register(name, email, password));
    }
  };

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
          <h3>Cadastro</h3>
          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Insira seu Nome"
            />
          </div>
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
              placeholder="Crie sua Senha"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Confirme sua senha</label>
            <input
              type="password"
              id="confirm-password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite sua senha novamente"
            />
          </div>
          <button type="submit">Cadastrar</button>
          <p className="new-client">
            Já é cliente? <Link to="/sign-in">Faça o seu login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export {Register}