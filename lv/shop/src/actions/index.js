import * as types from './../constans/ActionTypes';
import * as typesUser from './../constans/ActionUser';
// import callApiJwt from './../utils/apiJWT';
import callApi from './../utils/apicaller';
import axios from 'axios';
import * as Types from './../constans/ActionTypeCart';

// Lay toan bo san pham
// var jwt = localStorage.getItem('myAdmin');

export const actFetchProducts = (products) => {
    return {
        type: types.FETCH_PRODUCTS,
        products
    }
}

export const actFetchProductsRequest = () => {
    return (dispatch) =>{
        return callApi('products', 'GET', null).then(res =>{            
            dispatch(actFetchProducts(res.data.products))    
        })
    }
}

//dang nhap admin
// sua git

// export const actLogin = (user) => {
//     return {
//         type: typesUser.LOG_IN,
//         user 
//     }
// }

// export const actLoginRequest = (user) => {   
//     return (dispatch) =>{
//         return callApi('users/login', 'POST', user).then(res =>{     
//             console.log(res.data);
//             dispatch(actLogin(res.data))             
            
//         })
//     }
// }
export const actLogin = ( user) =>{
    return (dispatch) => {
        return callApi('users/login', 'POST', user).then(res =>{     
            var tokenLogin = res.data.token;
            localStorage.setItem('tokenLogin',tokenLogin);
            console.log(res.data);
            dispatch({
                type: typesUser.LOG_IN,
                user,
                res 
            })             
            
        })
    }
}
export const actLogout = (user) =>{
    return (dispatch) => {    
        localStorage.removeItem('tokenLogin');
         localStorage.removeItem('CART');
        var res = {
            userName:'',
            email:'',
            message:'',
            giohang:[]
        };
        
            dispatch({
                type: typesUser.LOG_OUT,
                user,
                res
            })             
            
        
    }
}



//them sua san pham
export const actAddProductRequest = (product) => {
    return dispatch => {        
        // console.log(jwt);
        // return new Promise(resolve => {
        //     axios.post('http://localhost:4000/products/',product,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            
        //     dispatch(actAddProduct(res.data));
        //     console.log(res.data);
        // })
        var jwt = localStorage.getItem('myAdmin');
        return axios.post('http://localhost:4000/products/',product,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            
            dispatch(actAddProduct(res.data));
            console.log(res.data);
            
        });
        
        
        // callApiJwt('products', 'POST', product,{headers: { Authorization: `Bearer ${jwt}`}}).then(res => {            
        //     dispatch(actAddProduct(res.data));
        // });
    }
}

export const actAddProduct = (product) => {
    return {
        type : types.ADD_PRODUCT,
        product
    }
}
export const actUpdateProductRequest = (product , id) => {
    return dispatch => {
        console.log(id);
        var jwt = localStorage.getItem('myAdmin');  
        axios.patch(`http://localhost:4000/products/${id}`,product,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            console.log(res);
            console.log(res.data);
            dispatch(actUpdateProduct(res.data));
            console.log(res.data);
            
        });
        // return callApi(`products/${product.id}`, 'PATCH', product).then(res => {
        //     console.log(res)
        //     dispatch(actUpdateProduct(res));
        // });
    }
}

export const actUpdateProduct = (product) => {
    return {
        type : types.UPDATE_PRODUCT,
        product
    }
}
export const actGetProductRequest = (id) => {
    return dispatch => {
        return callApi(`products/${id}`, 'GET', null).then(res => {
            // console.log(res);
            dispatch(actGetProduct(res.data));
        });
    }
}

export const actGetProduct = (product) => {
    return {
        type : types.EDIT_PRODUCT,
        product
    }
}
export const actDeleteProductRequest = (id) => {
    return dispatch => {     
        var jwt = localStorage.getItem('myAdmin'); 
        return axios.delete(`http://localhost:4000/products/${id}`,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            dispatch(actDeleteProduct(id));
      });
        
        // callApi(`products/${id}`, 'DELETE', null,{headers: { Authorization: `Bearer ${jwt}`}}).then(res =>{
        //     dispatch(actDeleteProduct(id));
        // })
    }
}

export const actDeleteProduct = (id) => {
    return {
        type : types.DELETE_PRODUCT,
        id
    }
}
// CART

export const actAddToCart = (product, quantity) => {
    return {
        type: Types.ADD_TO_CART,
        product,
        quantity
    }
}

export const actChangeMessage = (message) => {
    return {
        type: Types.CHANGE_MESSAGE,
        message
    }
}

export const actDeleteProductInCart = (product) => {
    return {
        type : Types.DELETE_PRODUCT_IN_CART,
        product
    }
}

export const actUpdateProductInCart = (product, quantity) => {
    return {
        type : Types.UPDATE_PRODUCT_IN_CART,
        product,
        quantity
    }
}

//SEARCH
export const searchTask = (keyword) => {
    return {
        type : types.SEARCH,
        keyword // keyword : keyword
    }
}
export const filterProduct = (loai) => {
    return {
        type : types.FILTER_TABLE,
        loai // filter : filter -> filterName, filterStatus
    }
}

//BINHLUAN

// export const actFetchBinhLuan = (binhluan) => {
//     return {
//         type: types.FETCH_BINHLUAN,
//         binhluan
//     }
// }

// export const actFetchBinhLuanRequest = () => {
//     return (dispatch) =>{
//         return callApi('binhluan', 'GET', null).then(res =>{                        
//             dispatch(actFetchBinhLuan(res.data.binhluan))    
//         })
//     }
// }
// export const actAddBinhLuanRequest = (binhluan) => {
//     return dispatch => {        
//         // console.log(jwt);
//         // return new Promise(resolve => {
//         //     axios.post('http://localhost:4000/products/',product,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            
//         //     dispatch(actAddProduct(res.data));
//         //     console.log(res.data);
//         // })
//         var jwt = localStorage.getItem('tokenLogin');
//         return axios.post('http://localhost:4000/binhluan',binhluan,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
//             // console.log(res.data.binhluan);
//             dispatch(actAddBinhLuan(res.data));
//             console.log(res.data);
            
//         });
        
        
//         // callApiJwt('products', 'POST', product,{headers: { Authorization: `Bearer ${jwt}`}}).then(res => {            
//         //     dispatch(actAddProduct(res.data));
//         // });
//     }
// }

// export const actAddBinhLuan = (binhluan) => {
//     return {
//         type : types.ADD_BINHLUAN,
//         binhluan
//     }
// }
export const actUpdateProductRequestBinhluan = (product , id) => {
    return dispatch => {
        // console.log(id);
        // var jwt = localStorage.getItem('myAdmin');  
        axios.patch(`http://localhost:4000/products/binhluan/${id}`,product).then(res =>{
            console.log(res);
            console.log(res.data);
            dispatch(actUpdateProductBinhluan(res.data));
            console.log(res.data);
            
        });
        // return callApi(`products/${product.id}`, 'PATCH', product).then(res => {
        //     console.log(res)
        //     dispatch(actUpdateProduct(res));
        // });
    }
}

export const actUpdateProductBinhluan = (product) => {
    return {
        type : types.UPDATE_PRODUCT,
        product
    }
}

//DONHANG
export const actFetchDonhangs = (donhangs) => {
    return {
        type: types.FETCH_DONHANG,
        donhangs
    }
}

export const actFetchDonhangsRequest = () => {
    return (dispatch) =>{
        // return callApi('orders', 'GET', null).then(res =>{    
        //     console.log(res);        
        //     // dispatch(actFetchDonhangs(res.data.donhangs))    
        // })
        var jwt = localStorage.getItem('myAdmin')
        return  axios.get('http://localhost:4000/orders/',{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            console.log(res.data);
                        dispatch(actFetchDonhangs(res.data.orders));
                        // console.log(res.data);
                    })
    }
}
export const actDeleteDonhangRequest = (id) => {
    return dispatch => {     
        var jwt = localStorage.getItem('myAdmin'); 
        return axios.put(`http://localhost:4000/orders/${id}`,{headers:{ Authorization: `Bearer ${jwt}`}}).then(res =>{
            dispatch(actDeleteDonhang(id));
      });
        
        // callApi(`products/${id}`, 'DELETE', null,{headers: { Authorization: `Bearer ${jwt}`}}).then(res =>{
        //     dispatch(actDeleteProduct(id));
        // })
    }
}

export const actDeleteDonhang = (id) => {
    return {
        type : types.DELETE_DONHANG,
        id
    }
}
//updaetesonhang
export const actUpdateDonhangRequest = (id) => {
    return dispatch => {
        // console.log(id);
        var jwt = localStorage.getItem('myAdmin'); 
        return axios.patch(`http://localhost:4000/orders/${id}`).then(res =>{
            // console.log(res);
            
            dispatch(actUpdateDonhang(id));
            // console.log(res.data);
            
        });
        // return callApi(`products/${product.id}`, 'PATCH', product).then(res => {
        //     console.log(res)
        //     dispatch(actUpdateProduct(res));
        // });
    }
}

export const actUpdateDonhang = (id) => {
    return {
        type : types.UPDATE_DONHANG,
        id
    }
}