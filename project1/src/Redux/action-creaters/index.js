import Axios from "axios";

export const showList = (value, pageNumber) => ({
    type: "SHOW",
    value,
    pageNumber
});
export const updateList = value => ({
    type: "UPDATE",
    userList: value
});
export const changePage = number => ({
    type: "CHANGEPAGE",
    pageNumber: number
});
export const getData = () => {
    return (dispatch, getState) => {
        getAllData(dispatch);
    };
};
export const editFirstName = firstName => ({
    type: "EDIT_FIRST_NAME",
    firstName: firstName
});
export const editLastName = lastName => ({
    type: "EDIT_LAST_NAME",
    lastName: lastName
});
export const editSex = sex => ({
    type: "EDIT_SEX",
    sex: sex
});
export const editAge = age => ({
    type: "EDIT_AGE",
    age: age
});
export const createFinished = () => ({
    type: "CREATE_FINISHED"
});
const requestStart = () => {
    return {
        type: "FETCH_START",
        value: []
    };
};
const requestSuccess = res => {
    return {
        type: "FETCH_SUCCESS",
        value: res
    };
};
const requestFail = err => {
    return {
        type: "FETCH_FAIL",
        error: err
    };
};
const editRequestSuccess = (res, finished) => {
    return {
        type: "EDIT_FETCH_SUCCESS",
        user: res,
        finished: finished
    };
};
const editRequestStart = finished => {
    return {
        type: "EDIT_FETCH_START",
        finished: finished
    };
};
const editRequestFail = (err, finished) => {
    return {
        type: "EDIT_FETCH_FAIL",
        error: err,
        finished: finished
    };
};
const createRequestStart = finished => {
    return {
        type: "CREATE_FETCH_START",
        finished
    };
};
const createRequestSuccess = finished => {
    return {
        type: "CREATE_FETCH_SUCCESS",
        finished
    };
};
const createRequestFail = (err, finished) => {
    return {
        type: "CREATE_FETCH_FAIL",
        createError: err,
        createFinished: finished
    };
};
const getAllData = dispatch => {
    dispatch(requestStart());
    Axios.get("http://localhost:9000/app/users/getall")
        .then(res => {
            dispatch(requestSuccess(res.data));
        })
        .catch(err => {
            dispatch(requestFail("GET ALL DATA FAIL"));
        });
};

export const addUser = body => {
    return (dispatch, getState) => {
        dispatch(createRequestStart(false));
        Axios.post("http://localhost:9000/app/users/insertone", body)
            .then(res => {
                dispatch(createRequestSuccess(true));
            })
            .catch(err => {
                dispatch(createRequestFail("ADD USER FAIL", false));
            });
    };
};
export const delUser = id => {
    return (dispatch, getState) => {
        dispatch(requestStart());
        Axios.delete(`http://localhost:9000/app/users/deleteone/${id}`)
            .then(res => {
                getAllData(dispatch);
            })
            .catch(err => {
                dispatch(requestFail("DELETE USER FAIL"));
            });
    };
};

export const editUser = (id, newbody) => {
    return (dispatch, getState) => {
        dispatch(editRequestStart(false));
        Axios.put(`http://localhost:9000/app/users/editone/${id}`, newbody)
            .then(res => {
                dispatch(editRequestSuccess({}, true));
            })
            .catch(err => {
                dispatch(editRequestFail("EDIT USER FAIL", false));
            });
    };
};

export const getOneUser = id => {
    return (dispatch, getState) => {
        dispatch(editRequestStart(false));
        Axios.get(`http://localhost:9000/app/users/getone/${id}`)
            .then(res => {
                dispatch(editRequestSuccess(res.data, false));
            })
            .catch(err => {
                dispatch(editRequestFail("GET USER FAIL", false));
            });
    };
};
