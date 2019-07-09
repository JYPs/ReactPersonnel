const initialState = {
    empCode: null,
    empName: null,
    deptCode: null,
    deptName: null,
    positionCode: null,
    positionName: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                user: action.user
            };
        case "DELETE_USER":
            return null;
        default:
            return {
                ...state
            }
    }
};

export default user;
