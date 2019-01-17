import * as types from './../constans/ActionTypes';

var initialState = 'Tất cả';
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FILTER_TABLE:
        console.log(action);        
            return action.loai
                
        default:
            return state;
    }
};

export default myReducer;