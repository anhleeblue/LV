import { combineReducers} from 'redux';
import products from './products';
import user from './users';
import cart from './cart';
import search from './search';
import filterTable from './filterTable';
import itemEditing from './itemEditing';
import donhangs from './donhangs';
// import user from './users';
const myReducer = combineReducers({
    products,
    user,
    cart,
    search,
    filterTable,
    itemEditing,
    donhangs

});
export default myReducer;