import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


function PrivateRoute({component: Component, ...rest}) {
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin
    
    return (
        <Route
            {...rest}
            render = {
                (props) => 
                    userInfo && userInfo !== null ? (
                        <Component {...props}></Component>
                    ) : (
                        <Redirect  to="/sign-in" />
                    )
            }
        ></Route>
    )
};

export {PrivateRoute}