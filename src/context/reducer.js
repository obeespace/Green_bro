export const actionType = {
    SET_USER: "SET_USER",
    SET_ITEMS: "SET_ITEMS"
}

const reducer = (state, action) => {
    console.log(action)

    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        case actionType.SET_ITEMS:
            return {
                ...state,
                items: action.items,
            };
        
        default:
            return state;
    }
}

export default reducer