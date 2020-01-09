const initState = {
    firstName: '',
    lastName: '',
    sex: '',
    age: '',
    password: '',
    editIsFetching: false,
    editError: null,
    finished: false,
    createFinished: false,
    createError: null
};

const editReducer = (state = initState, action) => {
    switch(action.type){
        case "EDIT_FIRST_NAME":
            return{
                ...state,
                firstName: action.firstName
            };
        case "EDIT_LAST_NAME":
            return{
                ...state,
                lastName: action.lastName
            };
        case "EDIT_SEX":
            return{
                ...state,
                sex: action.sex
            };
        case "EDIT_AGE":
            return{
                ...state,
                age: action.age
            };
        case "EDIT_FETCH_SUCCESS":
            return{
                ...action.user,
                editIsFetch: false,
                editError: null,
                finished: action.finished
            };
        case "EDIT_FETCH_START":
            return{
                firstName: '',
                lastName: '',
                sex: '',
                age: '',
                password: '',
                editIsFetching: true,
                editError: null,
                finished: action.finished      
            };
        case "EDIT_FETCH_FAIL":
            return{
                ...state,
                editIsFetching: false,
                editError: action.error,
                finished: action.finished
            }
        case "CREATE_FETCH_START":
            return{
                ...state,
                createFinished: action.finished,
                createError: null
            }
        case "CREATE_FETCH_FAIL":
            return{
                ...state,
                createFinished: action.finished,
                createError: action.err
            }
        case "CREATE_FETCH_SUCCESS":
            return{
                ...state,
                createFinished: action.finished,
                createError: null
            }
        case "CREATE_FINISHED":
            return{
                ...state,
                createFinished: false
            }
        default:
            return state
    }
}

export default editReducer;