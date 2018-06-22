import React, { Component } from 'react';
import './App.css';
import {Button, Modal} from 'react-bootstrap';

class ModalComponent extends Component{
    render(){
        return (
            <Modal show={this.props.showModal} onHide={this.props.handleModalClose} animation={false}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Update Form</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleModalClose}>Close</Button>
                </Modal.Footer>  
            </Modal>
        )
    }
}

export default ModalComponent;