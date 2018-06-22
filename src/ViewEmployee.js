import React, { Component } from 'react';
import './App.css';
import {Button, ProgressBar} from 'react-bootstrap';

class ViewEmployee extends Component{
    render(){
        return (
            <div>
                {this.props.employee && Object.keys(this.props.employee).length>0 && this.props.employee.hasOwnProperty('firstname')
                ?<div className="card" style={{textAlign : 'left', padding: '35px'}}>
                    <span><b>Firstname : </b> {this.props.employee.firstname}</span>
                    <span><b>Lastname : </b> {this.props.employee.lastname}</span>
                    <span><b>Email : </b> {this.props.employee.email}</span>
                    <span><b>Gender : </b> {this.props.employee.gender}</span>
                    <span><b>Team : </b> {this.props.employee.team}</span>
                    <span><b>Favourite Sports : </b> {this.props.employee.sport.join(', ')}</span>
                    <hr/>
                    <Button 
                        bsStyle={"warning"} 
                        onClick={this.props.handleHideViewComponent}>
                        Close
                    </Button>
                </div>
                :""
                }
            </div>
        )
    }
}

export default ViewEmployee;