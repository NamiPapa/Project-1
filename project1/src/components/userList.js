import React, { Component } from "react";
import {
    getData,
    updateList,
    showList,
    changePage,
    delUser,
    createFinished
} from "../Redux/action-creaters/index";
import { connect } from "react-redux";
import User from "./user";
import { withRouter } from "react-router-dom";

import "./userList.css";

const UserRouter = withRouter(User);

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: "",
            firstNameSort: 0,
            lastNameSort: 0,
            sexSort: 0,
            ageSort: 0
        };
    }
    componentDidMount() {
        this.props.getdata();
    }
    handleSearchContent = e => {
        e.preventDefault();
        let content = e.target.value;
        const filterByContent = item => {
            return (
                item.firstName.search(content) !== -1 ||
                item.lastName.search(content) !== -1 ||
                item.sex.search(content) !== -1 ||
                item.age.search(content) !== -1
            );
        };
        let userList = this.props.totalList;
        userList = userList.filter(filterByContent);
        this.props.update(userList);
        this.props.show(userList, 1);
    };
    handleUserCreate = () => {
        this.props.createStart();
        this.props.history.push("/usercreate");
    };
    handlePrevPageNumber = () => {
        this.props.changePage(this.props.pageNumber - 1);
    };
    handleNextPageNumber = () => {
        this.props.changePage(this.props.pageNumber + 1);
    };
    handleRollPage = e => {
        this.props.changePage(e);
    };
    comparationSort = (a, b) => {
        if (a < b) {
            return -1;
        } else {
            return 1;
        }
    };
    handleFirstNameSort = () => {
        let sortTime = this.state.firstNameSort + 1;
        this.setState({ firstNameSort: sortTime });
        let userList = this.props.userList;
        switch (sortTime % 3) {
            case 1:
                this.props.show(
                    userList.sort((a, b) =>
                        this.comparationSort(a.firstName, b.firstName)
                    ),
                    1
                );
                break;
            case 2:
                this.props.show(
                    userList.sort((a, b) =>
                        this.comparationSort(b.firstName, a.firstName)
                    ),
                    1
                );
                break;
            default:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(a._id, b._id)),
                    1
                );
                break;
        }
    };
    handleLastNameSort = () => {
        let sortTime = this.state.lastNameSort + 1;
        this.setState({ lastNameSort: sortTime });
        let userList = this.props.userList;
        switch (sortTime % 3) {
            case 1:
                this.props.show(
                    userList.sort((a, b) =>
                        this.comparationSort(a.lastName, b.lastName)
                    ),
                    1
                );
                break;
            case 2:
                this.props.show(
                    userList.sort((a, b) =>
                        this.comparationSort(b.lastName, a.lastName)
                    ),
                    1
                );
                break;
            default:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(a._id, b._id)),
                    1
                );
                break;
        }
    };
    handleAgeSort = () => {
        let sortTime = this.state.ageSort + 1;
        this.setState({ ageSort: sortTime });
        let userList = this.props.userList;
        switch (sortTime % 3) {
            case 1:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(a.age, b.age)),
                    1
                );
                break;
            case 2:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(b.age, a.age)),
                    1
                );
                break;
            default:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(a._id, b._id)),
                    1
                );
                break;
        }
    };
    handleSexSort = () => {
        let sortTime = this.state.sexSort + 1;
        this.setState({ sexSort: sortTime });
        let userList = this.props.userList;
        switch (sortTime % 3) {
            case 1:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(a.sex, b.sex)),
                    1
                );
                break;
            case 2:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(b.sex, a.sex)),
                    1
                );
                break;
            default:
                this.props.show(
                    userList.sort((a, b) => this.comparationSort(a._id, b._id)),
                    1
                );
                break;
        }
    };
    render() {
        const { showList, pageNumber } = this.props;
        const page = showList.length;
        const showPage = showList[pageNumber - 1];

        var pages = [];

        for (let i = 0; i < page; i++) {
            pages.push(i + 1);
        }

        return (
            <div>
                {this.props.error}
                {this.props.isFetch ? (
                    "loading"
                ) : (
                    <div className="maincontainer">
                        <div style={{ margin: "auto" }}>
                            <div className="searchcontainer">
                                <div><strong>Users</strong></div>
                                <div>
                                    <input
                                        onChange={this.handleSearchContent}
                                        placeholder="search"
                                    />
                                </div>
                            </div>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th
                                                onClick={
                                                    this.handleFirstNameSort
                                                }
                                            >
                                                First Name
                                            </th>
                                            <th
                                                onClick={
                                                    this.handleLastNameSort
                                                }
                                            >
                                                Last Name
                                            </th>
                                            <th onClick={this.handleSexSort}>
                                                Sex
                                            </th>
                                            <th onClick={this.handleAgeSort}>
                                                Age
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showPage &&
                                            showPage.map((item, index) => {
                                                return (
                                                    <UserRouter
                                                        id={item._id}
                                                        firstName={
                                                            item.firstName
                                                        }
                                                        lastName={item.lastName}
                                                        sex={item.sex}
                                                        age={item.age}
                                                        password={item.password}
                                                        pageNumber={pageNumber}
                                                        setNumber={(page) =>this.handlePrevPageNumber(page)}
                                                        key={index}
                                                    />
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="create">
                                <button
                                    className="roll"
                                    onClick={this.handlePrevPageNumber}
                                    disabled={pageNumber === 1}
                                >
                                    Prev Page
                                </button>
                                <span>
                                    {pages.map((item, index) => {
                                        if (item !== pageNumber) {
                                            return (
                                                <span
                                                    style={{padding:"5px", borderBottom:"solid skyblue", margin:"2px"}}
                                                    key={index}
                                                    onClick={() =>
                                                        this.handleRollPage(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {item}
                                                </span>
                                            );
                                        } else {
                                            return (
                                                <span
                                                    style={{padding:"5px", borderBottom:"solid orange", margin:"2px"}}
                                                    key={index}
                                                    onClick={() =>
                                                        this.handleRollPage(
                                                            item
                                                        )
                                                    }
                                                >
                                                    {item}
                                                </span>
                                            );
                                        }
                                    })}
                                </span>
                                <button
                                    className="roll"
                                    onClick={this.handleNextPageNumber}
                                    disabled={pageNumber === page}
                                >
                                    Next Page
                                </button>
                            </div>
                            <div className="create">
                                <button
                                    className="roll"
                                    onClick={this.handleUserCreate}
                                >
                                    Create New User
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    totalList: state.user.totalList,
    userList: state.user.userList,
    showList: state.user.showList,
    pageNumber: state.user.pageNumber,
    isFetch: state.user.isFetching,
    error: state.user.error
});

const mapDispatchToProps = dispatch => ({
    getdata: () => dispatch(getData()),
    update: value => dispatch(updateList(value)),
    show: (value, pageNumber) => dispatch(showList(value, pageNumber)),
    changePage: number => dispatch(changePage(number)),
    delUser: id => dispatch(delUser(id)),
    createStart: () => dispatch(createFinished())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
