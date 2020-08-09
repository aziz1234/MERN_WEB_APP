import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bookdetails from '../../reducers/bookdetails';
import Spinner from '../Spinner';
import {getBookDetails, getBookByGenre} from '../../actions/bookdetails'
import {
    Card, CardImg, CardBody,
    CardTitle, Button, Row, Col
  } from 'reactstrap';

const Explore = ({getBookDetails,bookdetails:{bookDetails,loading}}) =>{
    useEffect(()=>{
        getBookDetails() 
    },[getBookDetails])
    return(

        <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Row xs="4" >
            {bookDetails.map(x=>
                    <Col style={{paddingTop: "2.5rem"}}>
                        <Card key={x._id} style={{width:"100px", height:"180px"}}>
                            <CardImg top  src="https://via.placeholder.com/100x180" alt="book cover" />
                            <CardBody>
                                <CardTitle>{x.bookName}</CardTitle>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col> 
                    )}
            </Row>
          </Fragment>
        )}
      </Fragment>
    )
    
}

Explore.propTypes={
    bookdetails: PropTypes.object.isRequired,
    getBookDetails: PropTypes.func.isRequired,
    getBookByGenre: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    bookdetails: state.bookdetails

})

export default connect(mapStateToProps,{getBookDetails}) (Explore)