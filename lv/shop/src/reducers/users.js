import * as Types from './../constans/ActionUser';

var initialState = {
    userName:'',
    email:'',
    message:'',
    giohang:[]
};

const user = (state = initialState, action) => {
    switch(action.type){
        case Types.LOG_IN:
            return action.res;
        case Types.GET_USER:
            return action.user;
            // return action.user;  
        case Types.LOG_OUT:
            return action.res;          
        default:
            return state;
    }
}

export default user;
