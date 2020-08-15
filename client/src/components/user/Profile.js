import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {deleteUser} from '../../actions/auth';
import {deleteShelf} from '../../actions/usershelf';
import { Button, Modal, ModalBody, ModalHeader} from 'reactstrap';

const Profile = ({deleteShelf,deleteUser}) =>{

    const [modal, setModal] = useState(false);

    const toggle = () =>{
        setModal(!modal)
    }

    return(
        <Fragment>
            <center>
                <h2 style={{color: "teal"}}>Profile Settings</h2>
            </center>
            <hr/>
            <div>
                <h4 style={{color:"danger", paddingBottom:"1rem"}}>Delete Profile ?</h4>
            </div>
            <Button color="danger" onClick={()=>toggle()}>Delete{' '}<i class="fa fa-trash" aria-hidden="true"></i></Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirm Action</ModalHeader>
                <ModalBody>
                    <p style={{color: "red"}}>Note: If you delete your Profile all your data will also be lost, do you want to proceed ?</p>
                    <center>
                        <Button color="success" onClick={()=>{
                            deleteShelf()
                            deleteUser()
                        }} >
                            Yes
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>No</Button>  
                    </center>                                
                </ModalBody>
                
            </Modal>
        </Fragment>
    )
}

Profile.propTypes={
    deleteShelf: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default connect(null,{deleteShelf,deleteUser}) (Profile)