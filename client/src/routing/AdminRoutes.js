import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const AdminRoute = ({component:Component, auth:{isAuthenticated, loading, user}, ...rest}) => (
    <Route
        {...rest}
        render = {props=> 
            !isAuthenticated &&!loading?(
            
                <Redirect to = '/login' />
            ):(
                <Component {...props}/>
            )}
        />
)

AdminRoute.propTypes ={
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth 
})

export default connect(mapStateToProps) (AdminRoute);
