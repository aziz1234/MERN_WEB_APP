import React, { Fragment, useEffect } from 'react'
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bookdetails from '../../reducers/bookdetails';
import Spinner from '../Spinner';
import GenreSidebar from '../GenreSidebar';
import {getBookByGenre} from '../../actions/bookdetails'
import {
    Media, Row, Col
  } from 'reactstrap';

const BooksByGenre = ({bookdetails:{bookDetails,loading},getBookByGenre,match}) =>{
    useEffect(()=>{
        console.log("action fired")
        getBookByGenre(match.params.genre)
    },[getBookByGenre,match.params.genre])

    return(
        <Fragment>
        {loading ? (
            <Spinner />
          ) : (
        <Fragment>
            <Row>
                <Col sm ="10">
                    <h3 style={{paddingTop: "1rem", color:"teal"}}>{match.params.genre}</h3>
                    <hr/>
                    
                    {bookDetails.map(x=> 
                    <Fragment>
                        <Media key ={x._id} style={{paddingBottom:"1rem"}} >
                                
                                <Media style={{width:"20%"}}  object src={require(`../../images/${x.bookName}.jpg`)} alt="Book Cover" />
                                <Media body style={{paddingLeft:"1rem"}}>
                                    <Media heading>
                                    <Link to = {`/book/${x._id}`} style={{color:"teal"}}>
                                        {x.bookName}
                                    </Link>
                                    </Media>
                                        {x.bookDescription.substr(0,300)}<Link to = {`/book/${x._id}`}>...more</Link>
                                        <br/>
                                        <br/>
                                        <b style={{paddingTop:"1rem"}}>Author: {x.bookAuthor}</b>
                                </Media>
                        </Media>
                        <hr/>
                    </Fragment>
                    )}
                    
                    
                </Col>
                <Col sm ="auto">
                    <h4 style={{paddingTop: "1rem", color:"teal"}}>Genres</h4>
                    <hr/>
					<GenreSidebar/>
				</Col>
            </Row>
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