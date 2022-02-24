import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEW_CREATE_FAIL, PRODUCT_REVIEW_CREATE_REQUEST, PRODUCT_REVIEW_CREATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS} from '../constants/productConstants.js'
import axios from 'axios'

export const listProducts = (params = {}) => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        const {data} = await axios.get(`/api/products?name=${params.name ? params.name : ''}`)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})

    try {
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
};

export const createProduct = () => async (dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST});
    const {userSignin:{userInfo}} = getState();

    try {
        const {data} = await axios.post(
            '/api/products',
            {},
            {
                headers: {authorization: `Bearer ${userInfo.token}`}
            }
        );

        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
};

export const updateProduct = (product) => async(dispatch, getState) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST, payload: product});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.put(
            `/api/products/${product._id}`,
            product,
            {headers: {authorization: `Bearer ${userInfo.token}`}}
        );

        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }

};

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
    const {userSignin: {userInfo}} = getState();

    try {
        const {data} = await axios.delete(
            `/api/products/${productId}`,
            {headers: {authorization: `Bearer ${userInfo.token}`}}
        );

        dispatch({type: PRODUCT_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
};

export const createReview = (productId, review) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_REVIEW_CREATE_REQUEST});
    const {userSignin:{userInfo}} = getState();

    try {
        const {data} = await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            {
                headers: {authorization: `Bearer ${userInfo.token}`}
            }
        );

        dispatch({type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review})
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
};