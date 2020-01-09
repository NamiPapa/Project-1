import React, { Component } from "react";
import { connect } from "react-redux";
import { getOneUser, delUser } from "../Redux/action-creaters";

import "./user.css";

class User extends Component {
    handleEdit = () => {
        this.props.history.push(`/useredit/${this.props.id}`);
    };
    handleDelete = () => {
        console.log(this.props);
        if(this.props.user.showList[this.props.pageNumber - 1].length === 1){
            this.props.setNumber(this.props.pageNumber - 1);
        }
        this.props.delUser(this.props.id);
    };
    render() {
        return (
            <tr className="row">
                <td className="cell">
                    <button onClick={this.handleEdit} className="btn">
                        Edit
                    </button>
                </td>
                <td className="cell">
                    <button onClick={this.handleDelete} className="btn">
                        Delete
                    </button>
                </td>
                <td className="cell">{this.props.firstName}</td>
                <td className="cell">{this.props.lastName}</td>
                <td className="cell">{this.props.sex}</td>
                <td className="cell">{this.props.age}</td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    delUser: id => dispatch(delUser(id)),
    getOneUser: id => dispatch(getOneUser(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
