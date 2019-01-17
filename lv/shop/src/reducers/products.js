import * as types from './../constans/ActionTypes'
var initialState = [];
var findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product._id === id) {
            result = index;
        }
    });
    return result;
}
var products = (state = initialState, action) => {
    var index = -1;
    var { id,product } = action;
    switch (action.type) {
        case types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case types.DELETE_PRODUCT:
            console.log(state);
            console.log(id);
            let olddd = state.filter(i => i._id !== id);
            return [...olddd];
        case types.ADD_PRODUCT: {
            // state.push(action.product);
            let abc = state;
            console.log(abc);
            abc.push(action.product.createdProduct);
            console.log(abc);
            return [...abc]


        }


        // return [...state];
        // case types.UPDATE_PRODUCT:
        // console.log(state);
        // console.log(action);
        // index = findIndex(state, product.product._id);
        // console.log(index);
        //  state[index].binhluans.push(product.binhluan);
        // return [...state];
        default: return [...state];
    }

}
export default products;