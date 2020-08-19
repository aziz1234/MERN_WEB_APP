import React, { Fragment, useEffect, useLayoutEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bookdetails from '../../reducers/bookdetails';
import Spinner from '../Spinner';
import GenreSidebar from '../GenreSidebar';
import {getBookDetails, getBookByGenre} from '../../actions/bookdetails'
import {
    Card, CardImg, CardBody,
    Row, Col, CardLink
  } from 'reactstrap';
import img from '../../images/Dune.jpg'

const Explore = ({getBookDetails,bookdetails:{bookDetails,loading}}) =>{
    useEffect(()=>{
      console.log("action fired")
        getBookDetails() 
    },[getBookDetails])
    
    var findByGenre = (genre)=>{
      var a =[];
       bookDetails.filter(x=>x.bookGenre.find(y=>{
         if(y===genre)
          a.push({id:x._id,bookName:x.bookName})
       }))
      return(
        a.slice(0, 5).map(x=>
          <Fragment>
            <Col key={x.id}>
              <Card  >
                  <CardImg top width="100%"  src={require(`../../images/${x.bookName}.jpg`)} alt="book cover" />
                  <CardBody style={{ padding:"0.5rem"}}>
                  <Link to = {`/book/${x.id}`} style={{color:"teal"}}>
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
            <Row>
              <Col sm="9">
                <h3 style={{paddingTop: "1rem", color:"teal"}}>Recently added</h3>
                <hr/>
                <Row  xs="4">
                {bookDetails.slice(0, 8).map(x=>
                        <Col key={x._id}>
                            <Card   >
                                <CardImg top width="100%" src={require(`../../images/${x.bookName}.jpg`)} alt="book cover" />
                                <CardBody style={{ padding:"0.5rem"}}>
                                  <Link to = {`/book/${x._id}`} style={{color:"teal"}}>
                                    <CardLink style={{color:"teal"}}> more</CardLink>
                                  </Link>
                                </CardBody>    
                            </Card>
                        </Col> 
                        )}
                </Row>
              </Col>
              <Col sm ="auto">
                  <h4 style={{paddingTop: "1rem", color:"teal"}}>Genres</h4>
                  <hr/>
                  <GenreSidebar/>
              </Col>
            </Row>
            <h3 style={{paddingTop: "2.5rem", color:"teal"}}>Recently added in</h3>
            <hr/>
            <h4 style={{color:"teal"}}>Fantasy</h4>
            <Row xs ="5">
              {findByGenre("fantasy")}
            </Row> 
            <Link to ={`/booksin/${"fantasy"}`} style={{color:"teal"}}>
               <h5 style={{padding: "1rem", alignContent:"center"}}> More </h5>
            </Link>
            <hr/>
            <h4 style={{color:"teal"}}>Science Fiction</h4>
            <Row xs ="5">
              {findByGenre("science fiction")}
            </Row> 
            <Link to ={`/booksin/${"science fiction"}`} style={{color:"teal"}}>
               <h5 style={{padding: "1rem", alignContent:"center"}}> More </h5>
            </Link>
            <hr/>
            <h4 style={{color:"teal"}}>Romance</h4>
            <Row xs ="5">
              {findByGenre("romance")}
            </Row> 
            <Link to ={`/booksin/${"romance"}`} style={{color:"teal"}}>
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