import React, { Component } from 'react';
import './App.css';

class EmployeeList extends Component{
    constructor (props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(event) {
        console.log('on delete', event);
        
        // this.props.RemoveEmployee(index)
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
        let isSame = isEqual(this.props.employees, nextProps.employees);
       
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

    navigateToForm(id){
        this.props.clickOnUpdate(id);
        this.props.history.push('/EmployeeForm/' + id);
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
                    <button onClick={() => this.navigateToForm(employee.id)}>
                        UPDATE
                    </button>
                </td>
                <td>
                    <button onClick={() => this.props.RemoveEmployee(employee.id)}>
                        DELETE
                    </button>
                </td>
            </tr>)
            return element;
        })

        return(
            (this.props.employees.length === 0)
            ?<p>No Employess data present yet</p>
            :<table border="2" width="100%" style={{borderCollapse: 'collapse'}}>
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
            </table>
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