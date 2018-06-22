import React, { Component } from 'react';
import './App.css';
import {Table, Button} from 'react-bootstrap';
import ViewEmployee from './ViewEmployee';

class EmployeeList extends Component{

    constructor (props) {
        super(props);
        this.state = {
            currentEmployee : {}
        }
        this.handleHideViewComponent = this.handleHideViewComponent.bind(this);
    }

    /* 
    componentDidMount(){
        console.log("EmployeeList component mounted");
    }
    componentWillMount(){
        console.log("EmployeeList component is going to mount on DOM");
        // this.navigateToAddForm = this.navigateToForm.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log("EmployeeList Component receives new props");
    } */

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

    /* componentWillUpdate(){
        console.log("EmployeeList Component is going to update");
    }
    */
    
    componentDidUpdate(){
        console.log("EmployeeList Component is updated");
        if(this.state.currentEmployee && Object.keys(this.state.currentEmployee).length !== 0){
            //updating current employee
            console.log(this.state.currentEmployee);
            const index = this.props.employees.findIndex(emp => emp.id === this.state.currentEmployee.id);
            this.setState({ 
                currentEmployee : this.props.employees[index]
            })
        }
    } 
        
    handleOnClickOfUpdateButton(id, index, UpdateStatus){
        this.props.clickOnUpdateButton(id);
    }

    handleOnClickOfViewButton(id, index, UpdateStatus){
        // this.props.clickOnUpdateButton(id);
        this.setState({
            currentEmployee : this.props.employees[index]
        })
        // this.props.history.push('/EmployeeForm/' + id);
        console.log(this.state.currentEmployee);
        /* this.setState({
            showEmployee : !this.state.showEmployee
        }) */
    }

    handleHideViewComponent(){
        this.setState({
            currentEmployee : {}
        })
    }

    render(){

        const employeeList = this.props.employees.map((employee, index) => {
            const element = (<tr key={employee.firstname.toLowerCase() + employee.lastname.toLowerCase() + '-'+index}>
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>
                    <Button bsStyle="warning" onClick={() => this.handleOnClickOfViewButton(employee.id, index, 'Update')}>
                    VIEW
                    </Button>
                </td>
                <td>
                    <Button bsStyle="primary" onClick={() => this.handleOnClickOfUpdateButton(employee.id, index, 'Update')}>
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
                <div className="col-sm-6" style={{float : 'left'}}>
                    {(this.props.employees.length === 0)
                        ?<p>No Employess data present yet</p>
                        :<Table bordered hover>
                            <thead style={{backgroundColor : '#ddd'}}>
                                <tr>
                                    <th>ID</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Show</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>    
                            </thead>
                            <tbody>
                                {employeeList}
                            </tbody>    
                        </Table>
                    }
                    
                </div>
                <div className="col-sm-5" style={{float : 'left'}}>
                    <ViewEmployee employee={this.state.currentEmployee}
                    handleHideViewComponent={this.handleHideViewComponent}/>
                </div>
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