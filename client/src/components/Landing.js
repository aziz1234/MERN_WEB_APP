import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, ButtonToggle} from 'reactstrap';

import { render } from 'react-dom';
const Landing = () =>{
   
        return (
            <section className='landing'>
                <Jumbotron style={{ height: "50rem", textAlign: "center"}}>
                    <h1 className="display-3">Hello, Book worms!!</h1>
                    <p className="lead">This is a simple website to discover new books and keep track of your books</p>
                    <hr className="my-2" />
                    <p className="lead">
                    <Link to ="/login">
                        <ButtonToggle color="primary">Login</ButtonToggle>{' '}
                    </Link>
                    <Link to ="/register">
                        <ButtonToggle color="secondary">Register</ButtonToggle>
                    </Link>
                    </p>
                 </Jumbotron>
            </section>
          );
    
}

export default Landing