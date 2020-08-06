import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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

class AppNavbar extends Component{
    
   state ={
       isOpen: false
   } 
   toggle = () => {
       this.setState({
           isOpen: !this.state.isOpen
       });
   }


  render(){
    return (
        <div>
          <Navbar style={{backgroundColor: "teal"}} dark expand="md">
            <Link to ="/">
              <NavbarBrand >Next Book</NavbarBrand>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to ="/login">
                  <NavLink >Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                <Link to ="/register">
                  <NavLink href="">Register</NavLink>
                </Link>
                </NavItem>
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )
  }; 

}

export default AppNavbar