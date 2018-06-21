import React, { Component } from 'react';
import './App.css';
import {Table, Button, Modal} from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';

class EmployeeList extends Component{

    constructor (props) {
        super(props);
        this.state = {
            showModal : false,
        }
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
    }

    componentDidMount(){
        console.log("EmployeeList component mounted");
    }

    componentWillMount(){
        console.log("EmployeeList component is going to mount on DOM");
        // this.navigateToAddForm = this.navigateToForm.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("EmployeeList Component receives new props");
    }

    shouldComponentUpdate(nextProps, nextState){
        // console.log("EmployeeList Component receives new props");
        console.group("Old Props");
        console.table(this.props.employees);
        console.groupEnd("Old Props");
        console.group("New Props");
        console.table(nextProps.employees);
        console.groupEnd("New Props");
        let isUpdate;
        let isSame = isEqual(this.props.employees, nextProps.employees) && isEqual(this.state, nextState);
       
        isUpdate = !isSame;
        //If you are comparing specific property of props (not whole props object) then it can be done with this
        // isUpdate = this.props.employees !== nextProps.employees;
        console.log(isUpdate)
        //if return false component will not update/re-rendered
        return isUpdate;
    }

    componentWillUpdate(){
        console.log("EmployeeList Component is going to update");
    }

    componentDidUpdate(){
        console.log("EmployeeList Component is updated");
    }

    navigateToForm(id, index){
        this.handleModalShow();
        // this.props.clickOnUpdate(id);
        this.currentEmployee = this.props.employees[index];
        // this.props.history.push('/EmployeeForm/' + id);
    }

    handleModalClose(){
        console.count("Closing modal " + this.state.showModal);
        this.setState({
            showModal : false
        })
        console.count("Closing modal " + this.state.showModal);
    }

    handleModalShow(){
        console.log("Showing modal " + this.state.showModal);
        this.setState({
            showModal : true
        })
        console.log("Showing modal " + this.state.showModal);        
    }

    render(){

        const employeeList = this.props.employees.map((employee, index) => {
            const element = (<tr key={employee.firstname.toLowerCase() + employee.lastname.toLowerCase() + '-'+index}>
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.gender}</td>
                <td>{employee.team}</td>
                <td>{employee.sport.join(', ')}</td>
                <td>
                    <Button bsStyle="primary" onClick={() => this.navigateToForm(employee.id, index)}>
                    UPDATE</Button>
                </td>
                <td>
                    <Button bsStyle="danger" onClick={() => this.props.RemoveEmployee(employee.id)}>DELETE</Button>
                </td>
            </tr>)
            return element;
        })

        return(
            <div>
                {(this.props.employees.length === 0)
                    ?<p>No Employess data present yet</p>
                    :<Table bordered hover>
                        <thead style={{backgroundColor : '#ddd'}}>
                            <tr>
                                <th>ID</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>EmailID</th>
                                <th>Gender</th>
                                <th>Team</th>
                                <th>Favourite Sport</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>    
                        </thead>
                        <tbody>
                            {employeeList}
                        </tbody>    
                    </Table>
                }
                <Modal show={this.state.showModal} onHide={this.handleModalClose} animation={false}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title>Update Form</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <EmployeeForm onUpdateEmployee={this.props.onUpdateEmployee} employee={this.currentEmployee} closeModal={this.handleModalClose}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalClose}>Close</Button>
                    </Modal.Footer>  
                </Modal>
            </div>
        )
    }
}

function isEqual (value, other) {

	// Get the value type
	let type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	let compare = function (item1, item2) {

		// Get the object type
		let itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (let i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (let key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};

export default EmployeeList;