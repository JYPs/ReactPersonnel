// // Action type
// const GET_MENU = "GET_MENU";
//
// // Action creator
// function getMenu() {
//     return {
//         type: GET_MENU
//     }
// }
//
// // Export action creator
// export {GET_MENU, getMenu};


// const getMenu = () => ({
//     type: "GET_MENU"
// });

const SET_MENU = "SET_MENU";
const SET_CURRENT_MENU = "SET_CURRENT_MENU";
const SET_USER = "SET_USER";

const setMenu = menuList => ({
    type: SET_MENU,
    menuList
});

const setCurrentMenu = currentMenuName => ({
    type: SET_CURRENT_MENU,
    currentMenuName
});

const setUser = user => ({
    type: SET_USER,
    user
});

export {setMenu, setCurrentMenu, setUser};
