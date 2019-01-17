import * as types from './../constans/ActionTypes'
var initialState = [];
// var findIndex = (products, id) => {
//     var result = -1;
//     products.forEach((product, index) => {
//         if (product.id === id) {
//             result = index;
//         }
//     });
//     return result;
// }
var donhangs = (state = initialState, action) => {
    var index = -1;
    // console.log(action);
    var { id } = action;
    switch (action.type) {
        case types.FETCH_DONHANG:
            state = action.donhangs;
            return [...state];
        case types.DELETE_DONHANG:
            console.log(state);
            console.log(id);
            let olddd = state.filter(i => i._id !== id);
            return [...olddd];
        case types.UPDATE_DONHANG:
        console.log(state);
            // state = action.donhangs;
            index = findProductInCart(state, id);
            if(index !== -1){
                state[index].tinhtrang = true;
            }
            return [...state];
        // case types.ADD_PRODUCT: {
        //     // state.push(action.product);
        //     let abc = state;
        //     console.log(abc);
        //     abc.push(action.product.createdProduct);
        //     console.log(abc);
        //     return [...abc]


        // }


        // return [...state];
        // case types.UPDATE_PRODUCT:
        // index = findIndex(state, product._id);
        // state[index] = product;
        // return [...state];
        default: return [...state];
    }

}
var findProductInCart = (state, id) => {
    var index = -1;
    if (state.length > 0) {
        for (var i = 0; i < state.length; i++) {
            if (state[i]._id === id) {
                index = i;
                break;
            }
        }
    }
    return index;
}
export default donhangs;