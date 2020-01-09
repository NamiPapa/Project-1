import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../Redux/action-creaters";

import "./userEdit.css";

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            sex: "",
            age: "",
            password: "",
            repeat: ""
        };
    }
    handleFirstNameInput = e => {
        this.setState({ firstName: e.target.value });
    };
    handleLastNameInput = e => {
        this.setState({ lastName: e.target.value });
    };
    handleSexInput = e => {
        this.setState({ sex: e.target.value });
    };
    handleAgeInput = e => {
        this.setState({ age: e.target.value });
    };
    handlePasswordInput = e => {
        this.setState({ password: e.target.value });
    };
    handleRepeatInput = e => {
        this.setState({ repeat: e.target.value });
    };
    handleAddUser = e => {
        e.preventDefault();
        if (
            this.state.password === this.state.repeat &&
            this.state.password !== ""
        ) {
            let newUser = this.state;
            this.props.addUser(newUser);
        } else {
            window.alert("check password!");
        }
    };
    handleBack = () => {
        this.props.history.push("/users");
    };
    render() {

        const user = this.state;
        const isValid =
            user.firstName &&
            user.lastName &&
            user.sex &&
            user.age &&
            user.password &&
            user.repeat &&
            user.password === user.repeat;
        const alertactive =
            user.password.length <= user.repeat.length &&
            user.password !== user.repeat;
        return (
            <div className="userformContainer">
                {this.props.error}
                {this.props.finished ? (
                    <Redirect to={{ pathname: "/users" }} />
                ) : null}
                <div className="userForm">
                    <h3>Create New User:</h3>
                    <form onSubmit={this.handleAddUser}>
                        <div>
                            <div>
                                <TextField
                                    className="userinput"
                                    onChange={this.handleFirstNameInput}
                                    value={user.firstName}
                                    label="First Name"
                                    fullWidth
                                />
                            </div>
                            <div>
                                <TextField
                                    className="userinput"
                                    onChange={this.handleLastNameInput}
                                    value={user.lastName}
                                    label="Last Name"
                                    fullWidth
                                />
                            </div>
                            <div>
                                <TextField
                                    select
                                    fullWidth
                                    label="Select Gender"
                                    onChange={this.handleSexInput}
                                    defaultValue="Select Gender"
                                    margin="normal"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="Select Gender"></MenuItem>
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    className="userinput"
                                    onChange={this.handleAgeInput}
                                    value={user.age}
                                    label="Age"
                                    fullWidth
                                />
                            </div>
                            <div>
                                <TextField
                                    className="userinput"
                                    onChange={this.handlePasswordInput}
                                    type="password"
                                    label="New Password"
                                    fullWidth
                                />
                            </div>
                            <div>
                                {alertactive ? (
                                    <TextField
                                        error
                                        className="userinput"
                                        onChange={this.handleRepeatInput}
                                        type="password"
                                        label="Error"
                                        helperText="Re-enter same password"
                                        fullWidth
                                    />
                                ) : (
                                    <TextField
                                        className="userinput"
                                        onChange={this.handleRepeatInput}
                                        type="password"
                                        label="Re-enter Password"
                                        fullWidth
                                    />
                                )}
                            </div>
                        </div>
                        <div className="buttoncontainer">
                            <input
                                className="userbutton"
                                type="submit"
                                value="Add User"
                                disabled={!isValid}
                            />
                            <button
                                className="userbutton"
                                onClick={this.handleBack}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    finished: state.editUser.createFinished,
    error: state.editUser.createError
});

const mapDispatchToProps = dispatch => ({
    addUser: newUser => dispatch(addUser(newUser))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserCreate);
