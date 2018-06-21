import React, { Component } from 'react';
import './App.css';
import {Button, FormGroup, FormControl, ControlLabel, Radio, Checkbox, ButtonGroup, Grid, Col} from 'react-bootstrap';

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
        if(this.props.match && this.props.match.params.hasOwnProperty('id')){
            this.id = this.props.match.params.id;
            console.log("In update of employee " + this.id);
        }else if(!this.props.match && this.props.employee){
            this.id = this.props.employee.id;
            console.log("In update of employee " + this.id);
        }else{
            console.log("Adding new employee");
        }
        
    }

    componentDidMount(){
        console.log("EmployeeForm component mounted");
        // console.log(this.id);
        
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
            if(this.props.history){
                this.props.history.push('/');
            }
        }
    }

    /* componentWillMount(){
        console.log("EmployeeForm component is going to mount on DOM");
    }

    componentDidUpdate(){
        //because state change onChange of Input field
        console.log("EmployeeForm component is updated $$");
    }

    componentWillUnmount(){
        console.log("###### EmployeeForm commponet is going to unmount");
    } */

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
        if(this.props.history){
            this.props.history.push("/");
        }else if(this.props.closeModal){
            this.props.closeModal();
        }
    }

    render(){
        return (
            <Grid>
                {/* <Col lg={this.id?12:6} style={this.id?{}:{margin : '0 auto', textAlign:'left'}}> */}
                <Col lg={12}>
                <form name="EmployeeForm" onSubmit={this.handleFormSubmit}>
                        <FormGroup>
                            <ControlLabel><b>Firstname * :</b> </ControlLabel> 
                            <FormControl
                                type="text"
                                value={this.state.firstname}
                                placeholder="Enter firstname"
                                onChange={this.handleOnChange}
                                name="firstname"
                                required/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><b>Lastname * :</b> </ControlLabel> 
                            <FormControl
                                type="text"
                                value={this.state.lastname}
                                placeholder="Enter lastname"
                                onChange={this.handleOnChange}
                                name="lastname"
                                required/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><b>Email * :</b> </ControlLabel> 
                            <FormControl
                                type="email"
                                value={this.state.email}
                                placeholder="Enter email"
                                onChange={this.handleOnChange}
                                name="email"
                                required/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><b>Gender * :</b> </ControlLabel>{' '}
                            <Radio name="gender" value="male" onClick={this.handleOnChange} required inline>
                                Male
                            </Radio>{' '}
                            <Radio name="gender" value="female" onClick={this.handleOnChange} inline>
                                Female
                            </Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><b>Team :</b> </ControlLabel> 
                            <FormControl
                                componentClass='select'
                                value={this.state.team}
                                onChange={this.handleOnChange}
                                name="team">
                                <option value="">Select your team</option>
                                <option value="IMS">IMS Team</option>
                                <option value="CMMS">CMMS Team</option>
                                <option value="Android">Android Team</option>
                                <option value="IOS">IOS Team</option>
                                <option value="QA">QA Team</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel><b>Favourite Sports :</b> </ControlLabel>{' '}
                            <Checkbox name="sport" value="cricket" onClick={this.handleOnChangeCheckbox} inline>
                                Cricket
                            </Checkbox>{' '}
                            <Checkbox name="sport" value="football" onClick={this.handleOnChangeCheckbox} inline>
                                Football
                            </Checkbox>{' '}
                            <Checkbox name="sport" value="chess" onClick={this.handleOnChangeCheckbox} inline>
                                Chess
                            </Checkbox>{' '}
                            <Checkbox name="sport" value="carrom" onClick={this.handleOnChangeCheckbox} inline>
                                Carrom
                            </Checkbox>
                        </FormGroup>
                        <ButtonGroup>
                            <Button bsStyle="danger" type="submit">Save</Button>
                            <Button bsStyle="default" onClick={this.resetStateAndForm}>Clear</Button>
                        </ButtonGroup>
                        
                        {/* <Link to="/">Go Back</Link> */}
                        
                        {(this.props.match)
                        ?
                        <div>
                            <br/>
                            <hr/>
                            <Button bsStyle="link" onClick={this.navigateToList}>
                                &lt;= Go Back
                            </Button>
                        </div>
                        :""}
                        
                    </form>
                </Col>
            </Grid>
        )
    }
}
export default EmployeeForm;