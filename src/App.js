import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import ModalComponent from './ModalComponent';
import ViewEmployee from './ViewEmployee';

import * as ReactBootstrap from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employees : [],
      showModal : false,
      inAddOrUpdate : 'Update',
      currentEmployee : {}
    }
    this.AddEmployeeDetails = this.AddEmployeeDetails.bind(this);
    this.UpdateEmployee = this.UpdateEmployeeDetails.bind(this);
    this.RemoveEmployee = this.onRemoveEmployee.bind(this);
    this.prepareForUpdate = this.sendEmployeeDataToUpdate.bind(this);
    //modal handler
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);

    this.clickOnUpdateButton = this.clickOnUpdateButton.bind(this);
    this.handleOnClickOfViewButton = this.handleOnClickOfViewButton.bind(this);
  }

  componentWillMount(){
    console.log("App component is going to mount on DOM");
    if(localStorage.hasOwnProperty('employees')){
      const employee_list = JSON.parse(localStorage.getItem('employees'));
      this.setState({
        employees : employee_list
      })
    }
  }

  componentDidMount(){
    console.log("App Component mounted");
  }

  AddEmployeeDetails(data){
    const temp_employees = this.state.employees.slice();
    if(temp_employees.length !== 0){
      if(temp_employees[temp_employees.length - 1].hasOwnProperty('id')){
        const new_id = parseInt(temp_employees[temp_employees.length - 1].id, 10) + 1;
        console.log(new_id, typeof new_id);
        data.id = new_id.toString();
      }else{
        data.id = '101';
      }
    }else if(temp_employees.length === 0){
      data.id = '101';
    }
    temp_employees.push(data);
    this.setState({
      employees : temp_employees
    })
    localStorage.setItem('employees', JSON.stringify(temp_employees));
  }

  UpdateEmployeeDetails(id, data){
    console.log(id);
    const temp_employees = this.state.employees.slice();
    const updateIndex = temp_employees.findIndex(emp => emp.id === id);
    console.log("Updated " + updateIndex);
    if(updateIndex >= 0){
      temp_employees[updateIndex] = data;
      temp_employees[updateIndex].id = id;
      this.setState({
        employees : temp_employees
      })
      console.log("Employees are updated");
      localStorage.setItem('employees', JSON.stringify(temp_employees));
      if(this.state.currentEmployee && this.state.currentEmployee.id === this.state.employees[updateIndex].id){
        console.log("Updating view also");
        console.log("#######################################################");
        // console.table(this.state.currentEmployee);
        // console.table(this.state.employees[updateIndex]);
        this.setState({
          currentEmployee : temp_employees[updateIndex]
        })
      }
    }
  }

  onRemoveEmployee(id){
    const isDelete = window.confirm("Are you sure, you want to remove?");
    if(isDelete){
		console.log(this.state);
      const temp_employees = this.state.employees.slice();
      const index = temp_employees.findIndex(emp => emp.id === id);
      console.log(index);
      temp_employees.splice(index, 1);
      this.setState({
        employees : temp_employees
      });
      localStorage.setItem('employees', JSON.stringify(temp_employees));
      if(this.state.currentEmployee && this.state.currentEmployee.id === this.state.employees[index].id){
        this.setState({
          currentEmployee : {}
        })
      }
    }
  }

  sendEmployeeDataToUpdate(id){
    console.log("Update " + id);
    const updateIndex = this.state.employees.findIndex(emp => emp.id === id);
    this.updateEmployeeData = this.state.employees[updateIndex];
  }

	handleModalClose(){
		this.setState({
			showModal : false
		})
	}

	handleModalShow(AddOrUpdateStatus){
		this.setState({
			showModal : true,
			inAddOrUpdate : AddOrUpdateStatus
		})
	}

	clickOnUpdateButton(id){
		console.log(id);
    const index = this.state.employees.findIndex(emp => emp.id === id);
		this.currentEmployee = this.state.employees[index];
		this.handleModalShow('Update');
  }
  
  handleOnClickOfViewButton(index){
    console.log("Test " + index);
    this.setState({
        currentEmployee : this.state.employees[index]
    })
  }

  componentDidUpdate(){
    console.log("_____________________________________");
    console.table(this.state.employees);
    console.table(this.state.currentEmployee);
    console.log("_____________________________________");
  }

  render() {
    return (
      <div className="App">
	  	<br/>
      <ReactBootstrap.Button bsStyle="success" onClick={() => this.handleModalShow('Add')}> + Add New Employee</ReactBootstrap.Button>
      <hr/>
      <div className="col-sm-7" style={{float : 'left'}}>
        <EmployeeList 
        employees={this.state.employees} 
        RemoveEmployee={this.RemoveEmployee}
        clickOnUpdateButton={this.clickOnUpdateButton}
        handleOnClickOfViewButton={this.handleOnClickOfViewButton}
        currentViewEmployee={this.state.currentEmployee}
        />
      </div>
      <div className="col-sm-5" style={{float : 'left'}}>
        <ViewEmployee employee={this.state.currentEmployee}/>
      </div>

      <ModalComponent showModal={this.state.showModal} handleModalClose={this.handleModalClose}
        children={
          this.state.inAddOrUpdate === "Add"
          ?
            <div><EmployeeForm 
            AddEmployeeDetails={this.AddEmployeeDetails} 
            closeModal={this.handleModalClose}/></div>
          :
            <div><EmployeeForm onUpdateEmployee={this.UpdateEmployee} 
            employee={this.currentEmployee} 
            closeModal={this.handleModalClose}/></div>
        }>
      </ModalComponent>

      </div>
    );
  }
}

export default App;
