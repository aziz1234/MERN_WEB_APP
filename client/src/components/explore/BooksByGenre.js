import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bookdetails from '../../reducers/bookdetails';
import Spinner from '../Spinner';
import {getBookByGenre} from '../../actions/bookdetails'
import {
    Media
  } from 'reactstrap';

const BooksByGenre = ({bookdetails:{bookDetails,loading},getBookByGenre,match}) =>{
    useEffect(()=>{
        getBookByGenre(match.params.genre)
    },[getBookByGenre,match.params.genre])

    return(
        <Fragment>
        {loading ? (
            <Spinner />
          ) : (
        <Fragment>
            <h3 style={{paddingTop: "1rem", color:"teal"}}>Fantasy</h3>
            <hr/>
            {bookDetails.map(x=>
            <Media key ={x._id} style={{paddingBottom:"1rem"}} >
                <Media left href="#">
                    <Media object src="https://via.placeholder.com/80x120" alt="Book Cover" />
                </Media>
                <Media body style={{paddingLeft:"1rem"}}>
                    <Media heading>
                        {x.bookName}
                    </Media>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </Media>
            </Media>
            )}
            
        </Fragment>)}
    </Fragment>
    )

}

BooksByGenre.propTypes={
    bookdetails: PropTypes.object.isRequired,
    getBookByGenre: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    bookdetails: state.bookdetails
})

export default connect(mapStateToProps,{getBookByGenre}) (BooksByGenre);