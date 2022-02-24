import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS} from "../constants/orderConstants.js"
import axios from 'axios'
import {CART_EMPYT} from '../constants/cartConstants.js'

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});

    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.post('/api/orders', order, {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPYT});
        localStorage.removeItem("cartItems")
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message
                : error.message
        })
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    console.log("CHAMADASSO")
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin: {userInfo}} = getState();

    try {
        console.log("try chamado")
        const {data} = await axios.get(`/api/orders/${orderId}`, {
            headers: {authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: ORDER_DETAILS_FAIL, payload: message});
    }
};

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST});

    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get('/api/orders/mine', {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message =
            error.message && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: ORDER_MINE_LIST_FAIL, payload: message})
    }
};

export const listOrders = () => async (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.get('/api/orders', {
            headers: {authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({type: ORDER_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message =
            error.message && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: ORDER_LIST_FAIL, payload: message})
    }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DELIVER_REQUEST, payload: orderId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = axios.put(
            `/api/orders/${orderId}/deliver`,
            {},
            {
                headers: {authorization: `Bearer ${userInfo.token}`}
            }
        );
        console.log('chamado1')
        dispatch({type: ORDER_DELIVER_SUCCESS, payload: data})
    } catch (error) {
        const message =
            error.message && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({type: ORDER_DELIVER_FAIL, payload: message})
    }
}