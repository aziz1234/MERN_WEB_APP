import React, { Fragment, useEffect, useState, setState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import {getShelf} from '../../actions/usershelf';
import usershelf from '../../reducers/usershelf';

const MyShelf = ({usershelf,auth:{isAuthenticated}, getShelf}) =>{

    useEffect(()=>{
        getShelf()
    },[getShelf]);

    return(
        <Fragment>
            MyShelf
        </Fragment>
    )
}

MyShelf.propTypes ={
    getShelf: PropTypes.func.isRequired,
    usershelf: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    usershelf: state.usershelf,
    auth: state.auth 
})


export default connect(mapStateToProps,{getShelf}) (MyShelf);