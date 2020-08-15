import React, { Fragment, useEffect, useState, setState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import {getShelf, deleteBook, addBook} from '../../actions/usershelf';
import { Nav, NavItem, NavLink, Table,  Col,  Button, Modal, ModalHeader, ModalBody, FormGroup , Form, Label, Input} from 'reactstrap';
import {v4 as uuidv4} from 'uuid';

const MyShelf = ({usershelf,auth:{isAuthenticated}, getShelf,deleteBook, addBook}) =>{

    useEffect(()=>{
        getShelf()
    },[getShelf]);

    const [mybooks, setMyBooks] = useState([]);

    var newmybooks = '';
 
    const filter =(tag) =>{
       
        if(tag==="reading"){
            newmybooks = usershelf.shelf.bookShelf.filter(x=>x.status==="reading")
           setMyBooks(newmybooks)
        }
        else if(tag==="plan to read"){
            newmybooks = usershelf.shelf.bookShelf.filter(x=>x.status==="plan to read")
            setMyBooks(newmybooks)
        }
        else if(tag==="completed"){
            newmybooks = usershelf.shelf.bookShelf.filter(x=>x.status==="completed")
            setMyBooks(newmybooks)
        }
        else if(tag==="dropped"){
            newmybooks = usershelf.shelf.bookShelf.filter(x=>x.status==="dropped")
            setMyBooks(newmybooks)
        }
        else{ 
            newmybooks =usershelf.shelf.bookShelf
            setMyBooks(newmybooks)
        }
    }

    const [modal, setModal] = useState({
        modalstatus: 'false',
        status: '',
		rating: '',
        review: '',
        bookid:''
    });

    
	const toggle = (status,rating,review,bookid) => {
        
        setModal({...modal, modalstatus:(!modal.modalstatus), status, rating, review, bookid});
    }
	  
    const {status, rating, review, bookid} = modal;

    const onChange = e => setModal({...modal, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault();
		addBook({status, rating, review, bookid});
        window.location.reload(false);
	};

    return(
        <Fragment>
           {usershelf.loading?(
               <Spinner/>
           ):(
               <Fragment>
                  <center><h3 style={{color:"teal"}}>My Shelf</h3></center>
                   <hr/>
                   {usershelf.shelf.hasOwnProperty("bookShelf")?(
                    <Fragment>
                   <h4 style={{color:"teal"}}>Filter By:</h4>
                    <Nav>
                        <NavItem>
                            <NavLink href="#" style={{color:"teal"}} onClick={()=>filter("all books")}>All books</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" style={{color:"teal"}} onClick={()=>filter("reading")}>Reading</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" style={{color:"teal"}} onClick={()=>filter("plan to read")}>Plan to read</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" style={{color:"teal"}} onClick={()=>filter("completed")}>Completed</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" style={{color:"teal"}} onClick={()=>filter("dropped")}>Dropped</NavLink>
                        </NavItem>
                    </Nav>
                    <Table hover>
                        <thead>
                            <tr>
                                <th style={{color:"teal"}}>#</th>
                                <th style={{color:"teal"}}>Book</th>
                                <th style={{color:"teal"}}>Status</th>
                                <th style={{color:"teal"}}>Rating</th>
                                <th style={{color:"teal"}}>Update</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {mybooks.map((x,i)=>
                            <Fragment key = {uuidv4()}>
                                <tr>
                                    <th scope="row">{i+1}</th>
                                    <td>{x.bookId.bookName}</td>
                                    <td>{x.status}</td>
                                    <td>{x.rating?x.rating:"not rated"}</td>
                                    <td>
                                        <Button color="primary"  onClick={()=>toggle(x.status, x.rating, x.review, x.bookId._id)}><i class="fa fa-pencil" aria-hidden></i></Button> {' '}
                                        <Button color="danger" onClick={()=>{deleteBook(x.bookId._id)
                                                                             window.location.reload(false)}}>
                                                <i class="fa fa-trash" aria-hidden="true"></i></Button>
                                    </td>
                                </tr>
                            </Fragment>)}
                        </tbody>
                    </Table>
                    <Modal isOpen={!modal.modalstatus} toggle={toggle}>
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
                                        </Fragment>):(
                                            <Fragment>
                                               <h2> No Books In Your Shelf Yet :( </h2>
                                            </Fragment>
                                        )}
               </Fragment>
           )}
        </Fragment>
    )
}

MyShelf.propTypes ={
    getShelf: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    usershelf: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    usershelf: state.usershelf,
    auth: state.auth 
})


export default connect(mapStateToProps,{getShelf, deleteBook, addBook}) (MyShelf);