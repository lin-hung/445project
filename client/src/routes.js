import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const PrivateRoute = connect(state => ({
    auth: state.auth
}))(({ component: Component, auth, ...rest }) => (
    <Route
        render={(props) => {
            if (auth.isAuthed) {
                return (<Component {...rest} {...props} />)
            }
            return (<Redirect to="/" />)
        }
        }
    />
))
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};


export const PropsRoute = ({ component: Component, ...rest }) => {//this is neater than wrapping it in render lol
    return (
        <Route
            render={props =>
                <Component {...rest} {...props} />
            }
        />
    )
}