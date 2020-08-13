import React, { Fragment, useEffect, useState, setState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import {getShelf} from '../../actions/usershelf';
import { Nav, NavItem, NavLink, Table} from 'reactstrap';
import {v4 as uuidv4} from 'uuid';

const MyShelf = ({usershelf,auth:{isAuthenticated}, getShelf}) =>{

    useEffect(()=>{
        getShelf()
    },[getShelf]);

    const [mybooks, setMyBooks] = useState([]);

    var newmybooks = '';
    
    if(usershelf.hasOwnProperty(usershelf.shelf)){
        filter();
       // newmybooks = usershelf.shelf.bookShelf
        //setMyBooks(newmybooks)
    }
   

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

    return(
        <Fragment>
           {usershelf.loading?(
               <Spinner/>
           ):(
               <Fragment>
                  <center><h3 style={{color:"teal"}}>My Shelf</h3></center>
                   <hr/>
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
                                        <button type="button" color="primary"><i class="fa fa-pencil" aria-hidden></i></button> {' '}
                                        <button type="button" color="danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            </Fragment>)}
                        </tbody>
                    </Table>
               </Fragment>
           )}
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