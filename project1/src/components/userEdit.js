import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
    editUser,
    getOneUser,
    editFirstName,
    editLastName,
    editSex,
    editAge
} from "../Redux/action-creaters/index";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

import "./userEdit.css";

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            repeat: ""
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getOneUser(id);
    }
    handleFirstNameInput = e => {
        this.props.editFirstName(e.target.value);
    };
    handleLastNameInput = e => {
        this.props.editLastName(e.target.value);
    };
    handleSexInput = e => {
        this.props.editSex(e.target.value);
    };
    handleAgeInput = e => {
        this.props.editAge(e.target.value);
    };
    handlePasswordInput = e => {
        this.setState({ password: e.target.value });
    };
    handleRepeatInput = e => {
        this.setState({ repeat: e.target.value });
    };
    handleEditSubmit = e => {
        e.preventDefault();
        const id = this.props.match.params.id;
        if (
            this.props.password === this.state.password &&
            this.state.repeat === this.state.password
        ) {
            const user = this.props;
            let newbody = {
                firstName: user.firstName,
                lastName: user.lastName,
                sex: user.sex,
                age: user.age,
                password: user.password
            };
            this.props.editOne(id, newbody);
        } else {
            window.alert("wrong password!");
        }
    };
    handleBack = () => {
        this.props.history.push("/users");
    };
    render() {
        const isValid =
            this.props.firstName &&
            this.props.lastName &&
            this.props.sex &&
            this.props.age &&
            this.state.password &&
            this.state.repeat &&
            this.state.repeat === this.state.password;
        const alertactive =
            this.state.password.length <= this.state.repeat.length &&
            this.state.password !== this.state.repeat;
        return (
            <div>
                {this.props.finished ? (
                    <Redirect to={{ pathname: "/users" }} />
                ) : null}
                {this.props.error}
                {this.props.isFetching ? (
                    "loading..."
                ) : (
                    <div className="userformContainer">
                        <div className="userForm">
                            <h2>Edit User:</h2>
                            <form onSubmit={this.handleEditSubmit}>
                                <div>
                                    <div>
                                        <TextField
                                            className="userinput"
                                            onChange={this.handleFirstNameInput}
                                            value={this.props.firstName}
                                            label="First Name"
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            className="userinput"
                                            onChange={this.handleLastNameInput}
                                            value={this.props.lastName}
                                            label="Last Name"
                                            fullWidth
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Gender"
                                            value={this.props.sex}
                                            onChange={this.handleSexInput}
                                            margin="normal"
                                        >
                                            <MenuItem value="male">
                                                Male
                                            </MenuItem>
                                            <MenuItem value="female">
                                                Female
                                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="Age"
                                            className="userinput"
                                            onChange={this.handleAgeInput}
                                            value={this.props.age}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            className="userinput"
                                            onChange={this.handlePasswordInput}
                                            type="password"
                                        />
                                    </div>
                                    <div>
                                        {alertactive ? (
                                            <TextField
                                                fullWidth
                                                error
                                                className="userinput"
                                                label="Error"
                                                helperText="Re-enter same password"
                                                type="password"
                                                onChange={
                                                    this.handleRepeatInput
                                                }
                                            />
                                        ) : (
                                            <TextField
                                                fullWidth
                                                label="Re-enter Password"
                                                className="userinput"
                                                onChange={
                                                    this.handleRepeatInput
                                                }
                                                type="password"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="buttoncontainer">
                                    <input
                                        className="userbutton"
                                        type="submit"
                                        value="Save Changes"
                                        disabled={!isValid}
                                    />
                                    <button
                                        className="userbutton"
                                        onClick={this.handleBack}
                                    >
                                        back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    firstName: state.editUser.firstName,
    lastName: state.editUser.lastName,
    sex: state.editUser.sex,
    age: state.editUser.age,
    password: state.editUser.password,
    isFetching: state.editUser.editIsFetching,
    error: state.editUser.editError,
    finished: state.editUser.finished
});

const mapDispatchToProps = dispatch => ({
    getOneUser: id => dispatch(getOneUser(id)),
    editOne: (id, body) => dispatch(editUser(id, body)),
    editFirstName: firstName => dispatch(editFirstName(firstName)),
    editLastName: lastName => dispatch(editLastName(lastName)),
    editSex: sex => dispatch(editSex(sex)),
    editAge: age => dispatch(editAge(age))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserEdit);
