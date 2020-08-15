import React, { Fragment, useEffect, useState, setState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import {getBookById} from '../../actions/bookdetails'
import {getReviews} from '../../actions/usershelf'
import {addBook} from '../../actions/usershelf'
import {setAlert} from '../../actions/alert';
import { Container, Card, CardBody, Row, Col, Media, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup , Form, Label, Input} from 'reactstrap';


const BookById = ({auth: { isAuthenticated},bookdetails:{bookDetails},usershelf:{shelf,loading},getBookById,addBook,setAlert,match}) =>{

	useEffect(()=>{
		 getBookById(match.params.id)
	},[getBookById,match.params.id])

    const [modal, setModal] = useState(false);

	const toggle = () => {
		if(isAuthenticated){
		setModal(!modal);
		}
		else{
			setAlert('Please Login to perform the activity', 'warning');
		}
	}
	  
	const [formData, setFormData] = useState({
        status: '',
		rating: '',
		review: ''
    });
    const {status, rating, review} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault();
		let bookid = bookDetails._id;
		addBook({status, rating, review, bookid});
		setModal(!modal);
		window.location.reload(false);
	};
	 
	
	
	const getReviews=() =>{
			if(shelf.finalreviews.length){
				console.log("if triggered")
				return( 
						shelf.finalreviews.map(x=>
							<Fragment>
								<Col md="12"key ={x._id}>
									<p>
										<strong>{x.name}</strong>
										<span class="float-right">{x.details.rating}<i class="text-warning fa fa-star"></i></span>
									</p>
									<div class="clearfix"></div>
									<p>{x.details.review}</p>
								</Col>
							</Fragment>
						)
					)
			}
			else{
				console.log('else triggered');
				return(
					<Fragment>
					<h4>No reviews yet</h4>
					</Fragment>
				)
			}
	}
    
    return(
		<Fragment>
        {loading ? (
            <Spinner />
          ) : (
		<Fragment>
				<Container style={{paddingTop: "1.5rem"}}>
					<Card>
						<Row>
							<aside className="col-sm-3 border-right">
								<article className="gallery-wrap"> 
									<div className="img-wrap">
									<center>
										<Media src="https://via.placeholder.com/190x320"/>
									</center>
									</div>
									<center>
										<Button color="primary" onClick={toggle}><i class="fa fa-book"></i> Add to shelf </Button>
										<Modal isOpen={modal} toggle={toggle}>
											<ModalHeader toggle={toggle}>Add to shelf</ModalHeader>
											<ModalBody>
												<Form onSubmit={e => onSubmit(e)}>
													<FormGroup row>
													<Label for="exampleSelect" sm={2}>Status</Label>
														<Col sm={6}>
															<Input type="select" name="status" id="exampleSelect"  value={status} onChange={e => onChange(e)} required>
																<option value=''>(required)</option>
																<option value='plan to read'>plan to read</option>
																<option value='reading'>reading</option>
																<option value='completed'>completed</option>
																<option value='dropped'>dropped</option>
															</Input>
														</Col>
													</FormGroup>
													<FormGroup row>
													<Label for="exampleSelect" sm={2}>Rating</Label>
														<Col sm={4}>
															<Input type="select" name="rating"  id="exampleSelect"  value={rating} onChange={e => onChange(e)}>
																<option value =''>(optional)</option>
																<option value ='1'>1</option>
																<option value ='2'>2</option>
																<option value ='3'>3</option>
																<option value ='4'>4</option>
																<option value ='5'>5</option>
															</Input>
														</Col>
													</FormGroup>
													<FormGroup row>
														<Label for="exampleText" sm={2}>Review</Label>
														<Col sm={9}>
															<Input type="textarea" name="review" placeholder="(optional)" id="exampleText" value={review} onChange={e => onChange(e)} />
														</Col>
													</FormGroup>
													<Button type ="submit" color="primary" >save</Button>{' '}
													<Button color="secondary" onClick={toggle}>Cancel</Button>
												</Form>												
											</ModalBody>
											
										</Modal>
									</center>
								</article> 
							</aside>
							<aside class="col-sm-7">
								<article class="card-body p-5">
										<h3 class="title mb-3">{bookDetails.bookName}</h3>
										<dl class="param param-feature">
											<dt>Rating</dt>
											<dd>
												<span class="float-center"><i class="text-warning fa fa-star"></i></span>
												<span class="float-center"><i class="text-warning fa fa-star"></i></span>
												<span class="float-center"><i class="text-warning fa fa-star"></i></span>
												{' '}3.05
											</dd>
										</dl>
										<dl class="item-property">
											<dt>Description</dt>
											<dd><p>{bookDetails.bookDescription}</p></dd>
										</dl>
										<dl class="param param-feature">
											<dt>Author</dt>
											<dd>someone</dd>
										</dl>  
										<dl class="param param-feature">
											<dt>Publish date</dt>
											<dd>some date</dd>
										</dl>  
										<dl class="param param-feature">
											<dt>Genres</dt>
											<dd>{
												bookDetails.bookGenre.map(x=>x + ', ')}</dd>
										</dl>  
								</article> 
							</aside> 
						</Row>
					</Card>
				</Container>
				{/* review container */}
				<Container style={{paddingTop: "1.5rem",paddingBottom: "1.5rem"}}>
				<hr/>
				<h2 style={{paddingTop: "1.5rem",paddingBottom: "1.5rem"}}>Reviews</h2>
				<Card>
					<CardBody>
						<Row>
								{getReviews()}
						</Row>
					</CardBody>
				</Card>
			</Container>
		</Fragment> )}
	</Fragment>
    )
}

BookById.propTypes={
	bookdetails: PropTypes.object.isRequired,
	usershelf: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getBookById: PropTypes.func.isRequired,
	getReviews: PropTypes.func.isRequired,
	addBook: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	bookdetails: state.bookdetails,
	usershelf: state.usershelf,
	auth: state.auth,
})

export default connect(mapStateToProps,{getBookById,getReviews, setAlert, addBook}) (BookById)