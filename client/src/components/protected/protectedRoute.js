import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth && auth.isAuthenticated) {
                    return (
                        <Component {...props} />
                    )
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/auth/login/',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }

            }
        />
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(ProtectedRoute);