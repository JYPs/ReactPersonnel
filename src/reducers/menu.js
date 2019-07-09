// import {combineReducers} from "redux";
// import {GET_MENU} from "../action/actions";

const initialState = {
    currentMenuCode: "",
    menuList: [],
};

// action = { type: "SET_MENU", menuList: {menuName: ~~~~} }
const menuList = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MENU":
            return {
                ...state,
                menuList: action.menuList
            };
        case "SET_CURRENT_MENU":
            return {
                ...state,
                currentMenuName: action.currentMenuName
            };

        default:
            return state;
    }
};

export default menuList;
