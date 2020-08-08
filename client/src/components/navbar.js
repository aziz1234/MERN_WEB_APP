import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const AppNavbar = ({ auth: { isAuthenticated, loading }, logout }) =>{

  // state ={
  //   isOpen: false
  // } 
  // toggle = () => {
  //     this.setState({
  //         isOpen: !this.state.isOpen
  //     });
  // }
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const guestLinks =(
  <Fragment>
    <NavItem>
      <Link to ="/login">
        <NavLink >Login</NavLink>
      </Link>
    </NavItem>
    <NavItem>
      <Link to ="/register">
        <NavLink >Register</NavLink>
      </Link>
    </NavItem>
  </Fragment>
  );

  const authLinks = (
    <Fragment>
      <NavItem>
        <i class="fas fa-sign-out-alt"></i>{' '}
        <NavLink onClick={logout} href='#!'>Logout</NavLink>
      </NavItem>
    </Fragment>
  );

    return (
        <div>
          <Navbar style={{backgroundColor: "teal"}} dark expand="md">
            <Link to ="/">
              <NavbarBrand >Next Book</NavbarBrand>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {!loading && (
                  <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )
  

}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps,{logout}) (AppNavbar);