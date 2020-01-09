const initState = {
    totalList: [],
    userList: [],
    showList: [],
    pageNumber: 1,
    isFetching: false,
    error: null
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGEPAGE":
            return {
                ...state,
                pageNumber: action.pageNumber
            };
        case "UPDATE":
            return {
                ...state,
                userList: action.userList
            };
        case "SHOW": {
            let showList = [];
            for (let i = 0; i < action.value.length; i = i + 10) {
                showList.push(action.value.slice(i, i + 10));
            }
            return {
                ...state,
                showList,
                pageNumber: action.pageNumber
            };
        }
        case "FETCH_START":
            return {
                ...state,
                isFetching: true,
                showList: action.value
            };
        case "FETCH_FAIL":
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        case "FETCH_SUCCESS":
            let showList = [];
            for (let i = 0; i < action.value.length; i = i + 10) {
                showList.push(action.value.slice(i, i + 10));
            }
            return {
                ...state,
                isFetching: false,
                error: null,
                totalList: action.value,
                userList: action.value,
                showList
            };
        default:
            return state;
    }
};

export default reducer;
