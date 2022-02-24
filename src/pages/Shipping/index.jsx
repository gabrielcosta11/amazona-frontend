import './style.scss';
import {Header, Footer} from '../components/Header&Footer/index.jsx';
import {CheckoutSteps} from '../components/CheckoutSteps/index.jsx'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {saveShippingAddress} from '../../actions/cartActions.js'
import { useHistory } from 'react-router';
import axios from 'axios';


function Shipping() {
    const history = useHistory();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [CEP, setCEP] = useState(shippingAddress.CEP || '');
    const [logradouro, setLogradouro] = useState(shippingAddress.logradouro || '');
    const [numero, setNumero] = useState(shippingAddress.numero || '');
    const [complemento, setComplemento] = useState(shippingAddress.complemento || '');
    const [localidade, setLocalidade] = useState(shippingAddress.localidade || '');
    const [bairro, setBairro] = useState(shippingAddress.bairro || '');
    const [uf, setUf] = useState(shippingAddress.uf || '');
    const [freight, setFreight] = useState(0)
    const [submit, setSubmit] = useState(false)

    console.log(freight, "estado")
    console.log(typeof numero)

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const freightCalc = async (cep) => {
      console.log('chamada')
      const origin = "05818240"
      const destination = cep
      const {data} = await axios.post("/api/freight", {origin, destination})
      const {freightTax} = data
      console.log(freightTax, "dentro da função")

      setFreight(freightTax)
    };

    const setAddressHandler = async (e) => {
      const {value} = e.target
      const formatedValue = value.replace(/[^0-9]/g, '')
      setCEP(formatedValue)
      if(formatedValue?.length !== 8) {
        return
      };
      const {data} = await axios.get(`https://viacep.com.br/ws/${formatedValue}/json/`)
      setLogradouro(data.logradouro)
      setBairro(data.bairro)
      setLocalidade(data.localidade)
      setUf(data.uf)
    };

    if (!userInfo) {
        history.push('/sign-in')
    };

    useEffect(() => {
      if(CEP?.length !== 8) {
        return
      };
      if(submit) {
        freightCalc(CEP)
      };
  
      freightCalc(CEP)
    }, [CEP, submit]);
  
    useEffect(
      () => async () => {
      const abortController = new AbortController()
      const {data} = await axios.get("/api/freight", {signal: abortController.signal})
      setFreight(data)
  
      return () => {
        abortController.abort()
      }
    }, [])
  
    const submitHandler = async (e) => {
        setSubmit(true)
        e.preventDefault();
        dispatch(saveShippingAddress(
            {fullName, CEP, logradouro, numero, complemento, bairro, localidade, uf, freight}
        ))
        console.log(freight, "depois de tudo")
        history.push('/payment')
    };

  return (
    <div className="container">
      <Header />
      <CheckoutSteps step1 step2/>
      <div id="main">
        <form onSubmit={submitHandler}>
          <h3>Endereço de Envio</h3>
          <div className="field">
            <label htmlFor="full-name">Nome Completo</label>
            <input
              type="text"
              id="full-name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Insira seu Nome"
            />
          </div>
          <div className="field">
            <label htmlFor="CEP">CEP</label>
            <input
              type="text"
              id="CEP"
              required
              value={CEP}
              onChange={setAddressHandler}
              placeholder="Insira seu CEP"
            />
          </div>
          <div className="two-field-line">
            <div className="field">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                type="text"
                id="logradouro"
                required
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
                placeholder="Insira seu logradouro"
              />
            </div>
            <div className="field">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                id="numero"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              required
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Insira seu bairro"
            />
          </div>
          <div className="two-field-line">
            <div className="field">
              <label htmlFor="localidade">Localidade</label>
              <input
                type="text"
                id="localidade"
                required
                value={localidade}
                onChange={(e) => setLocalidade(e.target.value)}
                placeholder="Insira sua cidade"
              />
            </div>
            <div className="field">
              <label htmlFor="uf">UF</label>
              <input
                type="text"
                id="uf"
                required
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export {Shipping}