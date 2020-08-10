import React, { Fragment, useEffect, useState, setState } from 'react'
import { Container, Card, CardBody, Row, Col } from 'reactstrap';


//<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
const BookById = () =>{
    const value = useState(0)
    const onSubmit = e =>console.log(e);
    
    return(
        <Fragment>
    <Container>
	<h2>reviews</h2>
	
	<Card>
	    <CardBody>
	        <Row>
        	    <Col md="10">
        	        <p>
        	            <a class="float-left" href="#"><strong>Maniruzzaman Akash</strong></a>
        	            <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                        <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        	            <span class="float-right"><i class="text-warning fa fa-star"></i></span>
        	            <span class="float-right"><i class="text-warning fa fa-star"></i></span>

        	       </p>
        	       <div class="clearfix"></div>
        	        <p>Lorem Ipsum is simply dummy text of the pr make  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        	    </Col>
	        </Row>
	    </CardBody>
	</Card>

</Container>
    </Fragment>
    )
}

export default (BookById)