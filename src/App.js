import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import { Route, Link, Switch } from 'react-router-dom';

class ComponentNoMatch extends Component{
  render(){
    return (
      <div>
        <h1>404 Page not found</h1>
      </div>  
    )
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employees : [],
    }
    this.AddEmployeeDetails = this.AddEmployeeDetails.bind(this);
    this.UpdateEmployee = this.UpdateEmployeeDetails.bind(this);
    this.RemoveEmployee = this.onRemoveEmployee.bind(this);
    this.prepareForUpdate = this.sendEmployeeDataToUpdate.bind(this);
  }

  componentWillMount(){
    console.log("App component is going to mount on DOM");
    if(localStorage.hasOwnProperty('employees')){
      const employee_list = JSON.parse(localStorage.getItem('employees'));
      //not setting state, here I am initializing the state
      /* this.state = {
        employees : employee_list
      } */
      //but this is deprecated so we have to use setState instead
      this.setState({
        employees : employee_list
      })
    }
  }

  componentDidMount(){
    console.log("App Component mounted");
    // console.log(this.props);
  }

  AddEmployeeDetails(data){
    // console.table(data);
    const temp_employees = this.state.employees.slice();
    if(temp_employees.length !== 0){
      //checking for previous id field
      if(temp_employees[temp_employees.length - 1].hasOwnProperty('id')){
        const new_id = parseInt(temp_employees[temp_employees.length - 1].id) + 1;
        console.log(new_id, typeof new_id);
        data.id = new_id.toString();
      }else{
        data.id = '101';
      }
    }else if(temp_employees.length === 0){
      //creating new _id
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
    // console.log(data);
    const temp_employees = this.state.employees.slice();
    const updateIndex = temp_employees.findIndex(emp => emp.id === id);
    // temp_employees[updateIndex] = Object.assign({}, data);
    console.log("Updated " + updateIndex);
    if(updateIndex >= 0){
      temp_employees[updateIndex] = data;
      temp_employees[updateIndex].id = id;
      // console.log(temp_employees[updateIndex]);
      this.setState({
        employees : temp_employees
      })
      localStorage.setItem('employees', JSON.stringify(temp_employees));
    }
  
  }

  onRemoveEmployee(id){
    const isDelete = window.confirm("Are you sure, you want to remove?");
    if(isDelete){
      const temp_employees = this.state.employees.slice();
      const index = temp_employees.findIndex(emp => emp.id === id);
      console.log(index);
      temp_employees.splice(index, 1);
      this.setState({
        employees : temp_employees
      });

      localStorage.setItem('employees', JSON.stringify(temp_employees));
    }
  }

  sendEmployeeDataToUpdate(id){
    console.log("Update " + id);
    const updateIndex = this.state.employees.findIndex(emp => emp.id === id);
    this.updateEmployeeData = this.state.employees[updateIndex];
  }

  render() {
    return (
      <div className="App">
        <hr/>
        <Link to="/EmployeeForm" className="btn btn-success">+ Add New Employee Form</Link>
        {/* <Link to="/">Employee List</Link> */}
        <hr/>
        <Switch>
          <Route path={"/EmployeeForm"} exact
          render={(props) => <EmployeeForm AddEmployeeDetails={this.AddEmployeeDetails} {...props}/>} />
          <Route path={"/"} exact 
          render={(props) => <EmployeeList employees={this.state.employees} {...props} RemoveEmployee={this.RemoveEmployee} clickOnUpdate={this.prepareForUpdate} onUpdateEmployee={this.UpdateEmployee}/>} />
          {/* <Route path={'/EmployeeForm/:id'} exact
          render={(props) => <EmployeeForm onUpdateEmployee={this.UpdateEmployee} employee={this.updateEmployeeData} {...props}/>}/> */}
          <Route component={ComponentNoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
