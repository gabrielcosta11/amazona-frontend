import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {DefaultButton} from '../DefaultButton/index.jsx'
import searchIcon from './images/search.png';
import './style.scss'

function SearchBox(props) {
    const [name, setName] = useState('');
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        history.push(`/search/name/${name}`)
    }

    return (
        <form className="search-form" onSubmit={(e) => submitHandler(e)}>
            <div className="search-box">
                <input 
                    type="text"
                    name="search-field"
                    id="search-field"
                    onChange={(e) => setName(e.target.value)}
                />
                <DefaultButton type="submit">
                    <img src={searchIcon} alt="Lupa" />
                </DefaultButton>
            </div>
        </form>
    )
};

export {SearchBox}