import * as Types from './../constans/ActionTypes';

var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_PRODUCT:
        // console.log(action.product.product);
            return action.product.product;
        default:
            return state;
    }
}

export default itemEditing;
