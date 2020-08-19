import React, { Fragment, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import {addBookToDb, updateDatabase, deleteBookfromDatabase} from '../../actions/bookdetails';
import {getBookDetails} from '../../actions/bookdetails'
import PropTypes from 'prop-types';
import {  Table, Row, Col,  Button, Input} from 'reactstrap';
import {v4 as uuidv4} from 'uuid';


const Admin = ({addBookToDb,updateDatabase,getBookDetails,deleteBookfromDatabase,bookdetails:{bookDetails,loading}, auth}) =>{

    useEffect(()=>{
          getBookDetails() 
      },[getBookDetails])

    const [formData, setFormData] = useState({
        bookName: '',
        bookDescription: '',
        bookGenre: '',
        publicationDate: '',
        bookAuthor: ''
    });
    
    var {bookName, bookDescription, bookGenre, publicationDate, bookAuthor} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        bookGenre = bookGenre.split(',')    
        const data = {
            bookName,
            bookDescription,
            bookGenre,
            publicationDate,
            bookAuthor
        }
        addBookToDb(data);
    };
    
    ////
    const [editBook, setEditBook] = useState({
        id:'',
        bookName: '',
        bookDescription: '',
        bookGenre: '',
        publicationDate: '',
        bookAuthor: ''
    });

    var newEditBook =''
    const editbook = (details) =>{
        newEditBook ={
            id:details._id,
            bookName: details.bookName,
            bookDescription: details.bookDescription,
            bookGenre: details.bookGenre,
            publicationDate: details.publicationDate,
            bookAuthor: details.bookAuthor
        }
        setEditBook(newEditBook);
    }
    
    const onEditChange = f => setEditBook({...editBook, [f.target.name]:f.target.value})

   var genre = editBook.bookGenre + ''
    genre =  genre.split(',')
 
    const onEditSubmit = f => {
        f.preventDefault();  
        const data = {
            bookName: editBook.bookName,
            bookDescription: editBook.bookDescription,
            bookGenre: genre,
            publicationDate: editBook.publicationDate,
            bookAuthor: editBook.bookAuthor
        }
        updateDatabase(editBook.id,data);
        window.location.reload(false)
    };
    

    return<Fragment>
        {auth.loading?(<Spinner/>):(
            <Fragment>
            {!(auth.user.email==="fake@gmail.com")?<Redirect to = '/login' />:""}
            <form style={{padding:"5% 20% "}} onSubmit={e => onSubmit(e)}>
                <h3>Add New Book</h3>
                <div className="form-group">
                    <label>Book Name</label>
                    <input type="text" className="form-control" name="bookName" placeholder="Enter book name" value={bookName} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    
                    <Input type="textarea" className="form-control" name="bookDescription" placeholder="Enter Book Description" value={bookDescription} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <label>Genres</label>
                    <input type="text" className="form-control" name="bookGenre" placeholder="Enter book genres" value={bookGenre} onChange={e => onChange(e)}  />
                </div>

                <div className="form-group">
                    <label>Publication Date</label>
                    <input type="text" className="form-control" name="publicationDate" placeholder="Enter publication Date" value={publicationDate} onChange={e => onChange(e)} />
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" name="bookAuthor" placeholder="Enter Author Name" value={bookAuthor} onChange={e => onChange(e)} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Add Book</button>
            </form>
            {loading?(
                <Spinner/>
            ):(
                <Fragment>
                    <Row>
                        <Col>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th style={{color:"teal"}}>#</th>
                                    <th style={{color:"teal"}}>Book Name</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {bookDetails.map((x,i)=>
                                <Fragment key = {uuidv4()}>
                                    <tr>
                                        <th scope="row">{i+1}</th>
                                        <td>{x.bookName}</td>
                                        <td>
                                            <Button color="primary"  onClick={()=>editbook(x)}><i class="fa fa-pencil" aria-hidden></i></Button> {' '}
                                            <Button color="danger" onClick={()=>{deleteBookfromDatabase(x._id)
                                                                                window.location.reload(false)}}>
                                                    <i class="fa fa-trash" aria-hidden="true"></i></Button>
                                        </td>
                                    </tr>
                                </Fragment>)}
                            </tbody>
                        </Table>
                        </Col>
                        <Col>
                        <form style={{padding:"5% 20% "}} onSubmit={f => onEditSubmit(f)}>
                            <h3>Edit Book</h3>
                            <div className="form-group">
                                <label>Book Name</label>
                                <input type="text" className="form-control" name="bookName" placeholder="Enter book name" value={editBook.bookName} onChange={f => onEditChange(f)} required/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <Input type="textarea" className="form-control" name="bookDescription" placeholder="Enter Book Description" value={editBook.bookDescription} onChange={f => onEditChange(f)} required />
                            </div>

                            <div className="form-group">
                                <label>Genres</label>
                                <input type="text" className="form-control" name="bookGenre" placeholder="Enter book genres" value={editBook.bookGenre} onChange={f => onEditChange(f)}  />
                            </div>

                            <div className="form-group">
                                <label>Publication Date</label>
                                <input type="text" className="form-control" name="publicationDate" placeholder="Enter publication Date" value={editBook.publicationDate} onChange={f => onEditChange(f)} />
                            </div>

                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" name="bookAuthor" placeholder="Enter Author Name" value={editBook.bookAuthor} onChange={f => onEditChange(f)} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Add Book</button>
                        </form>
                        </Col>
                    </Row>
                </Fragment>
            )}
    </Fragment>
    )} 
    </Fragment>
};
 
Admin.propTypes = {
    addBookToDb: PropTypes.func.isRequired,
    auth: PropTypes.object,
    bookdetails: PropTypes.object.isRequired,
    getBookDetails: PropTypes.func.isRequired,
    updateDatabase: PropTypes.func.isRequired,
    deleteBookfromDatabase: PropTypes.func.isRequired
};
const mapStateToProps =state =>({
    bookdetails: state.bookdetails,
    auth: state.auth
});

export default connect(mapStateToProps, {addBookToDb,updateDatabase, deleteBookfromDatabase, getBookDetails}) (Admin);