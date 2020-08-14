import React, { Fragment, useEffect, useLayoutEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bookdetails from '../../reducers/bookdetails';
import Spinner from '../Spinner';
import {getBookDetails, getBookByGenre} from '../../actions/bookdetails'
import {
    Card, CardImg, CardBody,
    Row, Col, CardLink
  } from 'reactstrap';

const Explore = ({getBookDetails,bookdetails:{bookDetails,loading}}) =>{
    useEffect(()=>{
      console.log("action fired")
        getBookDetails() 
    },[getBookDetails])
    var a =[];
    var findByGenre = (genre)=>{
       bookDetails.filter(x=>x.bookGenre.find(y=>{
         if(y===genre)
          a.push(x._id)
       }))
      return(
        a.slice(0, 4).map(x=>
          <Fragment>
            <Col key={x}>
              <Card  >
                  <CardImg top width="100%" src="https://via.placeholder.com/180x270" alt="book cover" />
                  <CardBody style={{ padding:"0.5rem"}}>
                  <Link to = {`/book/${x}`} style={{color:"teal"}}>
                    <CardLink style={{color:"teal"}} href="#!">more</CardLink>
                  </Link>
                  </CardBody>    
              </Card>
          </Col> 
          </Fragment>
          )
      )
    }
    return(

        <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h3 style={{paddingTop: "1rem", color:"teal"}}>Recently added</h3>
            <hr/>
            <Row  sm="4">
            {bookDetails.slice(0, 4).map(x=>
                    <Col key={x._id}>
                        <Card   >
                            <CardImg top width="100%" src="https://via.placeholder.com/180x270" alt="book cover" />
                            <CardBody style={{ padding:"0.5rem"}}>
                              <Link to = {`/book/${x._id}`} style={{color:"teal"}}>
                                <CardLink style={{color:"teal"}}> more</CardLink>
                              </Link>
                            </CardBody>    
                        </Card>
                    </Col> 
                    )}
            </Row>
            <h3 style={{paddingTop: "2.5rem", color:"teal"}}>Recently added in</h3>
            <hr/>
            
            <h4 style={{color:"teal"}}>Fantasy</h4>
            
            <Row xs ="4">
              {findByGenre("fantasy")}
            </Row> 
            <Link to ={`/booksin/${"fantasy"}`} style={{color:"teal"}}>
               <h5 style={{padding: "1rem", alignContent:"center"}}> More </h5>
            </Link>
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