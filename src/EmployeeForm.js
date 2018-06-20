import React, { Component } from 'react';
import './App.css';

class EmployeeForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            gender : '',
            email : '',
            team : '',
            sport : []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangeCheckbox = this.handleOnChangeCheckbox.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetStateAndForm = this.resetStateAndForm.bind(this);
        this.navigateToList = this.navigateToList.bind(this);
        if(this.props.match.params.hasOwnProperty('id')){
            this.id = this.props.match.params.id;
            console.log("In update of employee " + this.id);
        }else{
            console.log("Adding new employee");
        }
        
    }

    componentDidMount(){
        console.log("EmployeeForm component mounted");
        console.log(this.id);
        
        // After component renders successfully, store all checkboxes
        this.checkboxes = document.querySelectorAll('[type="checkbox"]');
        this.radios = document.querySelectorAll('[type="radio"]');
        //we are assigning values after render
        if(this.id && this.props.employee){
            //Checking the checkboxes and radio buttons
            this.radios.forEach(radio => {
                if(radio.value === this.props.employee.gender){
                    radio.checked = true;
                }
            })

            this.checkboxes.forEach(check => {
                this.props.employee.sport.map(sport_name => {
                    if(check.value === sport_name){
                        check.checked = true;
                    }
                    return sport_name;
                })
            })

            this.setState({
                firstname : this.props.employee.firstname,
                lastname : this.props.employee.lastname,
                gender : this.props.employee.gender,
                email : this.props.employee.email,
                team : this.props.employee.team,
                sport : this.props.employee.sport
            })
            
        }else if(!this.props.employee && this.id){
            alert("In update, no employee details are received");
            this.props.history.push('/');
        }
    }

    componentWillMount(){
        console.log("EmployeeForm component is going to mount on DOM");
    }

    componentDidUpdate(){
        //because state change onChange of Input field
        console.log("EmployeeForm component is updated $$");
    }

    componentWillUnmount(){
        console.log("###### EmployeeForm commponet is going to unmount");
    }

    handleOnChange(e){
        console.log(e.target.name)
        const obj = {};
        obj[e.target.name] = e.target.value; 
        this.setState(obj)
    }

    handleOnChangeCheckbox(e){
        const values = [];
        this.checkboxes.forEach((check) => {
            if(check.checked){
                values.push(check.value);
            }
        })
        this.setState({
            sport : values
        })
    }
    
    resetStateAndForm(){
        //resetting the state
        this.setState({
            firstname : '',
            lastname : '',
            gender : '',
            email : '',
            team : '',
            sport : []
        })
        //resetting the form
        document.EmployeeForm.reset();
    }

    handleFormSubmit(e){
        e.preventDefault();
        // console.table(this.state);
        if(this.id){
            console.log('In Update');
            this.props.onUpdateEmployee(this.id, this.state);
        }else{
            console.log('In Add');
            this.props.AddEmployeeDetails(this.state);
        }
        
        this.resetStateAndForm();
        this.navigateToList();
    }

    navigateToList(){
        this.resetStateAndForm();
        this.props.history.push("/");
    }

    render(){
        return (
            <form name="EmployeeForm" onSubmit={this.handleFormSubmit}>
                <b>First Name : * </b> <input type="text" name="firstname" placeholder="firstname" 
                onChange={this.handleOnChange} value={this.state.firstname} required/>
                <br/>
                <br/>
                <b>Last Name : * </b> <input type="text" name="lastname" placeholder="lastname" onChange={this.handleOnChange} value={this.state.lastname} required/>
                <br/>
                <br/>
                <b>Email ID : * </b> <input type="email" name="email" placeholder="email id" onChange={this.handleOnChange} value={this.state.email} required/>
                <br/>
                <br/>
                <b>Gender : * </b> <input type="radio" name="gender" value="male" onClick={this.handleOnChange} required/> Male
                {/* mention required on any of the radio with the same name, but same for the checkbox won't work */}
                <input type="radio" name="gender" value="female" onChange={this.handleOnChange}/> Female
                <br/>
                <br/>
                <b>Team : </b> 
                <select name="team" onChange={this.handleOnChange} value={this.state.team}>
                    <option value="">Select your team</option>
                    <option value="IMS">IMS Team</option>
                    <option value="CMMS">CMMS Team</option>
                    <option value="Android">Android Team</option>
                    <option value="IOS">IOS Team</option>
                    <option value="QA">QA Team</option>
                </select>
                <br/>
                <br/>
                <b>Favourite Sports :</b> 
                <input type="checkbox" name="sport" value="cricket" onClick={this.handleOnChangeCheckbox}/> Cricket
                <input type="checkbox" name="sport" value="football" onClick={this.handleOnChangeCheckbox}/> Football
                <input type="checkbox" name="sport" value="chess" onClick={this.handleOnChangeCheckbox}/> Chess
                <input type="checkbox" name="sport" value="carrom" onClick={this.handleOnChangeCheckbox}/> Carrom
                <br/>
                <br/>
                <input type="submit"/>
                <input type="button" value="Reset" onClick={this.resetStateAndForm}/>
                <br/>
                <br/>
                {/* <Link to="/">Go Back</Link> */}
                <hr/>
                <button onClick={this.navigateToList}>
                    &lt;= Go Back
                </button>
                <hr/>
            </form>
        )
    }
}
export default EmployeeForm;